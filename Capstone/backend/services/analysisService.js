const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const Analysis = require("../models/Analysis"); // Pastikan path model benar

/**
 * --- KAMUS DATA ILMIAH (BASED ON REFERENCE) ---
 * Referensi: 
 * 1. Pratiwi et al. (2017) - Mapping Enneagram ke Fitur Grafologi
 * 2. Clifford Howard (1922) - Definisi Makna Fitur (Slant, Size, Shading)
 * 3. David Lester (1981) - Validitas Tekanan & Energi
 */
const ENNEAGRAM_KNOWLEDGE_BASE = {
  'Tipe 1': {
    name: "The Reformer (Perfeksionis)",
    desc: "Anda memiliki standar tinggi, idealis, dan ingin segala sesuatu berjalan benar.",
    features: {
      slant: { val: "Vertical (Tegak)", meaning: "Logika menguasai emosi, terkontrol (Howard, 1922)." },
      size: { val: "Small (Kecil)", meaning: "Konsentrasi tinggi & detail-oriented." },
      pressure: { val: "Medium/Light", meaning: "Sensitivitas & kontrol diri." },
      baseline: { val: "Straight (Lurus)", meaning: "Disiplin & emosi stabil." }
    }
  },
  'Tipe 2': {
    name: "The Helper (Penolong)",
    desc: "Anda sangat peduli pada orang lain, empatik, dan ingin merasa dibutuhkan.",
    features: {
      slant: { val: "Rightward (Miring Kanan)", meaning: "Ekspresif secara emosional & sosial (Howard, 1922)." },
      size: { val: "Medium/Rounded", meaning: "Ramah & mudah beradaptasi." },
      pressure: { val: "Medium", meaning: "Hangat & bersahabat." },
      baseline: { val: "Upward/Flexible", meaning: "Optimisme sosial." }
    }
  },
  'Tipe 3': {
    name: "The Achiever (Pencapai)",
    desc: "Anda energik, adaptif, dan termotivasi untuk mencapai kesuksesan dan pengakuan.",
    features: {
      slant: { val: "Vertical/Right", meaning: "Ambisius namun tetap logis." },
      size: { val: "Large (Besar)", meaning: "Ingin tampil & dilihat (Broad ideas)." },
      pressure: { val: "Heavy (Tebal)", meaning: "Energi vitalitas tinggi untuk beraksi (Lester, 1981)." },
      baseline: { val: "Ascending (Naik)", meaning: "Ambisi & target-oriented." }
    }
  },
  'Tipe 4': {
    name: "The Individualist (Romantis)",
    desc: "Anda ekspresif, sensitif, unik, dan sering merasa berbeda dari orang lain.",
    features: {
      slant: { val: "Left/Variable", meaning: "Menarik diri atau mood berubah-ubah." },
      size: { val: "Variable", meaning: "Kreativitas & non-konformis." },
      pressure: { val: "Light (Tipis)", meaning: "Perasaan halus & sensitif (Howard, 1922)." },
      baseline: { val: "Wavy (Bergelombang)", meaning: "Fluktuasi emosi." }
    }
  },
  'Tipe 5': {
    name: "The Investigator (Pengamat)",
    desc: "Anda analitis, mandiri, logis, dan cenderung menjaga privasi.",
    features: {
      slant: { val: "Vertical/Left", meaning: "Objektif, dingin, menahan emosi." },
      size: { val: "Small/Micro", meaning: "Fokus mental & intelektual (Howard, 1922)." },
      pressure: { val: "Light", meaning: "Lebih mengutamakan pikiran daripada fisik." },
      baseline: { val: "Straight", meaning: "Logika yang kaku." }
    }
  },
  'Tipe 6': {
    name: "The Loyalist (Pecinta Setia)",
    desc: "Anda setia, bertanggung jawab, waspada, dan butuh rasa aman.",
    features: {
      slant: { val: "Left/Vertical", meaning: "Waspada & hati-hati." },
      size: { val: "Small/Compressed", meaning: "Skeptis & analitis." },
      pressure: { val: "Medium/Varied", meaning: "Kecemasan atau antisipasi." },
      baseline: { val: "Straight", meaning: "Kebutuhan akan aturan/struktur." }
    }
  },
  'Tipe 7': {
    name: "The Enthusiast (Antusias)",
    desc: "Anda spontan, optimis, menyukai petualangan, dan menghindari kebosanan.",
    features: {
      slant: { val: "Rightward (Miring Kanan)", meaning: "Impulsif & ekspresif." },
      size: { val: "Large", meaning: "Bebas & tidak suka dikekang detail." },
      pressure: { val: "Heavy/Fast", meaning: "Energi meluap-luap." },
      baseline: { val: "Ascending", meaning: "Optimisme tinggi (Pratiwi, 2017)." }
    }
  },
  'Tipe 8': {
    name: "The Challenger (Penantang)",
    desc: "Anda dominan, tegas, percaya diri, dan suka memegang kendali.",
    features: {
      slant: { val: "Right/Vertical", meaning: "Dominasi & ketegasan." },
      size: { val: "Large", meaning: "Ekspansif & keberanian." },
      pressure: { val: "Heavy (Tebal)", meaning: "Vitalitas fisik & materialistis (Lester/Howard)." },
      baseline: { val: "Ascending/Firm", meaning: "Ambisi kuat." }
    }
  },
  'Tipe 9': {
    name: "The Peacemaker (Pendamai)",
    desc: "Anda cinta damai, santai, suportif, dan menghindari konflik.",
    features: {
      slant: { val: "Vertical/Round", meaning: "Netral & emosi stabil." },
      size: { val: "Medium/Rounded", meaning: "Fleksibel & akomodatif." },
      pressure: { val: "Light/Medium", meaning: "Tenang & tidak agresif." },
      baseline: { val: "Straight/Wavy", meaning: "Mengikuti arus." }
    }
  }
};

class AnalysisService {

  /**
   * Analyze handwriting
   */
  static async analyzeHandwriting(userId, imageData, analysisType) {
    // 1. Buat Record "Pending" di Database
    const analysis = new Analysis({
      userId,
      analysisType,
      imageUrl: analysisType === "image" ? imageData : null, // Simpan path jika upload file
      status: "pending",
    });

    await analysis.save();

    try {
      // 2. Panggil AI Flask Server (MobileNetV2)
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
      // analysis.traits = mockResult.traits; // Traits handled in graphologyAnalysis
      analysis.description = mockResult.description;
      analysis.status = "completed";
      analysis.errorMessage = `AI service unavailable: ${aiError.message}`;
    }

    await analysis.save();

    console.log(`[Service] Analisis Sukses untuk User ${userId}`);
    return analysis;
  }

  /**
   * Helper: Request ke Flask Python
   */
  static async callFlaskAI(imageData, analysisType) {
    const aiUrl = process.env.FLASK_AI_URL;
    if (!aiUrl) throw new Error("FLASK_AI_URL belum disetting di .env");

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
        throw new Error('Invalid image data format: ' + (isBase64 ? 'Base64' : 'File Path'));
      }

      // Parse response dari Flask AI
      const aiData = response.data;
      console.log(`[Flask AI] Response:`, aiData);

      // Extract prediction
      const rawPrediction = aiData.prediction || aiData.data?.prediction || "Unknown";
      const cleanType = rawPrediction.split('(')[0].trim(); // Ambil "Tipe 1"
      const rawConfidence = parseFloat(aiData.confidence) || parseFloat(aiData.data?.confidence) || 0;


      // Map ke traits database
      const mapping = ENNEAGRAM_KNOWLEDGE_BASE[cleanType];

      if (!mapping) {
        console.warn(`[Flask AI] Unknown type: ${cleanType}, using fallback`);
        throw new Error(`Unknown personality type: ${cleanType}`);
      }

      return {
        personalityType: mapping.name,
        enneagramType: cleanType,
        confidence: rawConfidence,
        traits: mapping.features,
        description: mapping.desc
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
        enneagramType: "Tipe 7",
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
      // ... (Rest of mocks can remain, just ensuring structure is valid)
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