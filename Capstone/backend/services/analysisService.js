const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const Analysis = require("../models/Analysis");

/**
 * KAMUS DATA ENNEAGRAM -> TRAITS MAPPING
 * Mapping dari tipe Enneagram ke traits yang digunakan di database
 */
const ENNEAGRAM_TO_TRAITS = {
  'Tipe 1': {
    personalityType: 'Analytical',
    traits: {
      confidence: 85,
      creativity: 65,
      extraversion: 55,
      analyticalMind: 90,
      emotionalIntelligence: 75,
    },
    description: 'Anda memiliki standar tinggi, idealis, dan ingin segala sesuatu berjalan benar. Anda adalah pemikir analitis yang logis.'
  },
  'Tipe 2': {
    personalityType: 'Optimist',
    traits: {
      confidence: 80,
      creativity: 75,
      extraversion: 85,
      analyticalMind: 65,
      emotionalIntelligence: 90,
    },
    description: 'Anda sangat peduli pada orang lain dan ingin merasa dibutuhkan. Anda memiliki pandangan positif dan mampu menginspirasi orang lain.'
  },
  'Tipe 3': {
    personalityType: 'Leader',
    traits: {
      confidence: 90,
      creativity: 75,
      extraversion: 85,
      analyticalMind: 75,
      emotionalIntelligence: 85,
    },
    description: 'Anda energik dan termotivasi untuk mencapai kesuksesan. Anda memiliki kepribadian pemimpin yang kuat.'
  },
  'Tipe 4': {
    personalityType: 'Creative',
    traits: {
      confidence: 70,
      creativity: 95,
      extraversion: 65,
      analyticalMind: 60,
      emotionalIntelligence: 88,
    },
    description: 'Anda ekspresif secara emosional dan menghargai keindahan serta keunikan diri. Anda memiliki jiwa yang sangat kreatif.'
  },
  'Tipe 5': {
    personalityType: 'Analytical',
    traits: {
      confidence: 75,
      creativity: 65,
      extraversion: 45,
      analyticalMind: 95,
      emotionalIntelligence: 70,
    },
    description: 'Anda suka mengumpulkan pengetahuan dan cenderung menjaga privasi. Anda adalah pemikir analitis yang mendalam.'
  },
  'Tipe 6': {
    personalityType: 'Analytical',
    traits: {
      confidence: 70,
      creativity: 65,
      extraversion: 60,
      analyticalMind: 85,
      emotionalIntelligence: 80,
    },
    description: 'Anda menghargai keamanan, setia pada kelompok, dan selalu antisipatif. Anda berpikir dengan hati-hati sebelum bertindak.'
  },
  'Tipe 7': {
    personalityType: 'Optimist',
    traits: {
      confidence: 85,
      creativity: 80,
      extraversion: 90,
      analyticalMind: 60,
      emotionalIntelligence: 75,
    },
    description: 'Anda menyukai pengalaman baru, petualangan, dan menghindari kebosanan. Anda adalah seseorang yang optimis dan energik.'
  },
  'Tipe 8': {
    personalityType: 'Leader',
    traits: {
      confidence: 95,
      creativity: 70,
      extraversion: 85,
      analyticalMind: 75,
      emotionalIntelligence: 80,
    },
    description: 'Anda adalah pemimpin alami yang tidak takut menyuarakan kebenaran. Anda tegas dan percaya diri dalam mengambil keputusan.'
  },
  'Tipe 9': {
    personalityType: 'Dreamer',
    traits: {
      confidence: 65,
      creativity: 85,
      extraversion: 70,
      analyticalIntelligence: 55,
      emotionalIntelligence: 90,
    },
    description: 'Anda menghindari konflik dan berusaha menjaga harmoni. Anda adalah seorang pemimpi yang idealis dengan emosi yang kuat.'
  }
};

class AnalysisService {

  /**
   * Analyze handwriting menggunakan Flask AI Service
   */
  static async analyzeHandwriting(userId, imageData, analysisType) {
    try {
      // Create analysis record with pending status
      const analysis = new Analysis({
        userId,
        analysisType,
        imageUrl: analysisType === "image" ? imageData : null,
        canvasData: analysisType === "canvas" ? imageData : null,
        status: "pending",
      });

      await analysis.save();

      try {
        // Call Flask AI Service
        const aiResult = await this.callFlaskAI(imageData, analysisType);

        // Update analysis with AI result
        analysis.personalityType = aiResult.personalityType;
        analysis.enneagramType = aiResult.enneagramType; // <--- FIX: Save Enneagram Type
        analysis.traits = aiResult.traits;
        analysis.description = aiResult.description;
        analysis.status = "completed";

        console.log(`[AI Success] Analysis completed for user ${userId}`);

      } catch (aiError) {
        console.error(`[AI Error] ${aiError.message}. Using fallback mock data.`);

        // Fallback to mock data if AI fails
        const mockResult = this.getMockAnalysisResult();
        analysis.personalityType = mockResult.personalityType;
        analysis.enneagramType = mockResult.enneagramType || "Tipe X (Mock)";
        analysis.traits = mockResult.traits;
        analysis.description = mockResult.description;
        analysis.status = "completed";
        analysis.errorMessage = `AI service unavailable: ${aiError.message}`;
      }

      await analysis.save();
      return analysis;

    } catch (error) {
      throw new Error(`Analysis failed: ${error.message}`);
    }
  }

  /**
   * Call Flask AI Service
   */
  static async callFlaskAI(imageData, analysisType) {
    const aiUrl = process.env.FLASK_AI_URL;

    if (!aiUrl) {
      throw new Error("FLASK_AI_URL not configured in .env");
    }

    try {
      let response;

      // Check if imageData is base64 string or file path
      const isBase64 = typeof imageData === 'string' && imageData.startsWith('data:image');

      if (isBase64) {
        // Handle base64 data (from frontend upload or canvas)
        const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');

        const form = new FormData();
        form.append('file', buffer, {
          filename: analysisType === 'canvas' ? 'canvas.png' : 'upload.jpg'
        });

        console.log(`[Flask AI] Sending ${analysisType} data (base64) to ${aiUrl}...`);

        response = await axios.post(aiUrl, form, {
          headers: {
            ...form.getHeaders()
          },
          timeout: 30000
        });

      } else if (analysisType === 'image' && fs.existsSync(imageData)) {
        // Handle file path (from multer upload)
        const form = new FormData();
        form.append('file', fs.createReadStream(imageData));

        console.log(`[Flask AI] Sending image file to ${aiUrl}...`);

        response = await axios.post(aiUrl, form, {
          headers: {
            ...form.getHeaders()
          },
          timeout: 30000
        });

      } else {
        throw new Error('Invalid image data format');
      }

      // Parse response dari Flask AI
      const aiData = response.data;
      console.log(`[Flask AI] Response:`, aiData);

      // Extract prediction - Flask AI returns: { status, prediction, confidence, message }
      // prediction format: "Tipe 1" atau "Tipe 1 (Nama)"
      const rawPrediction = aiData.prediction || aiData.data?.prediction || "Unknown";
      const cleanType = rawPrediction.split('(')[0].trim(); // Ambil "Tipe 1"

      // Map ke traits database
      const mapping = ENNEAGRAM_TO_TRAITS[cleanType];

      if (!mapping) {
        console.warn(`[Flask AI] Unknown type: ${cleanType}, using fallback`);
        throw new Error(`Unknown personality type: ${cleanType}`);
      }

      return {
        personalityType: mapping.personalityType,
        enneagramType: cleanType, // <--- Pastikan ini dikirim (Contoh: "Tipe 6")
        traits: mapping.traits,
        description: mapping.description
      };

    } catch (error) {
      if (error.code === 'ECONNREFUSED') {
        throw new Error("Flask AI service is not running. Please start the Python server.");
      } else if (error.code === 'ETIMEDOUT') {
        throw new Error("Flask AI service timeout. Please check the connection.");
      } else if (error.response) {
        throw new Error(`Flask AI error: ${error.response.status} - ${error.response.statusText}`);
      } else {
        throw new Error(`Flask AI request failed: ${error.message}`);
      }
    }
  }

  /**
   * Mock analysis result (fallback ketika AI service error)
   */
  static getMockAnalysisResult() {
    const personalities = [
      {
        personalityType: "Optimist",
        traits: {
          confidence: 85,
          creativity: 72,
          extraversion: 80,
          analyticalMind: 65,
          emotionalIntelligence: 78,
        },
        description:
          "Anda adalah seseorang yang optimis dan percaya diri. Anda memiliki pandangan positif terhadap kehidupan dan mampu menginspirasi orang lain.",
      },
      {
        personalityType: "Introvert",
        traits: {
          confidence: 70,
          creativity: 85,
          extraversion: 45,
          analyticalMind: 82,
          emotionalIntelligence: 75,
        },
        description:
          "Anda adalah introvert yang penuh kreativitas. Anda lebih suka bekerja sendiri dan memiliki pemikiran yang mendalam.",
      },
      {
        personalityType: "Creative",
        traits: {
          confidence: 78,
          creativity: 95,
          extraversion: 72,
          analyticalMind: 60,
          emotionalIntelligence: 82,
        },
        description:
          "Anda memiliki jiwa yang sangat kreatif. Anda selalu mencari cara baru untuk mengekspresikan diri dan berinovasi.",
      },
      {
        personalityType: "Analytical",
        traits: {
          confidence: 75,
          creativity: 65,
          extraversion: 55,
          analyticalMind: 90,
          emotionalIntelligence: 70,
        },
        description:
          "Anda adalah pemikir analitis yang logis. Anda menyukai data dan detail dalam mengambil keputusan.",
      },
      {
        personalityType: "Leader",
        traits: {
          confidence: 90,
          creativity: 75,
          extraversion: 85,
          analyticalMind: 75,
          emotionalIntelligence: 85,
        },
        description:
          "Anda memiliki kepribadian pemimpin yang kuat. Anda mampu menginspirasi dan memimpin tim dengan percaya diri.",
      },
      {
        personalityType: "Dreamer",
        traits: {
          confidence: 65,
          creativity: 88,
          extraversion: 68,
          analyticalMind: 55,
          emotionalIntelligence: 88,
        },
        description:
          "Anda adalah seorang pemimpi yang idealis. Anda memiliki visi besar dan emosi yang kuat untuk mewujudkannya.",
      },
    ];

    return personalities[Math.floor(Math.random() * personalities.length)];
  }

  // Get analysis history untuk user
  static async getUserAnalysisHistory(userId, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const analyses = await Analysis.find({ userId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Analysis.countDocuments({ userId });

      return {
        analyses,
        total,
        page,
        pages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw new Error(`Failed to get analysis history: ${error.message}`);
    }
  }

  // Get single analysis
  static async getAnalysis(analysisId) {
    try {
      const analysis = await Analysis.findById(analysisId).populate(
        "userId",
        "name email"
      );
      return analysis;
    } catch (error) {
      throw new Error(`Failed to get analysis: ${error.message}`);
    }
  }

  // Delete analysis
  static async deleteAnalysis(analysisId) {
    try {
      await Analysis.findByIdAndDelete(analysisId);
      return { message: "Analysis deleted successfully" };
    } catch (error) {
      throw new Error(`Failed to delete analysis: ${error.message}`);
    }
  }

  // Get all analyses (for admin)
  static async getAllAnalyses(page = 1, limit = 20) {
    try {
      const skip = (page - 1) * limit;
      const analyses = await Analysis.find()
        .populate("userId", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      const total = await Analysis.countDocuments();

      return {
        analyses,
        total,
        page,
        pages: Math.ceil(total / limit),
      };
    } catch (error) {
      throw new Error(`Failed to get analyses: ${error.message}`);
    }
  }

  // Get statistics
  static async getStatistics() {
    try {
      const totalAnalyses = await Analysis.countDocuments();
      const successfulAnalyses = await Analysis.countDocuments({
        status: "completed",
      });
      const failedAnalyses = await Analysis.countDocuments({
        status: "failed",
      });

      const personalityDistribution = await Analysis.aggregate([
        { $match: { status: "completed" } },
        { $group: { _id: "$personalityType", count: { $sum: 1 } } },
      ]);

      const successRate =
        totalAnalyses > 0 ? ((successfulAnalyses / totalAnalyses) * 100).toFixed(2) : 0;

      return {
        totalAnalyses,
        successfulAnalyses,
        failedAnalyses,
        successRate,
        personalityDistribution,
      };
    } catch (error) {
      throw new Error(`Failed to get statistics: ${error.message}`);
    }
  }
}

module.exports = AnalysisService;
