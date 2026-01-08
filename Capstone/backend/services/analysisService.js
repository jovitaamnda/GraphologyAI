const Analysis = require("../models/Analysis");

class AnalysisService {
  // Analyze handwriting dari image atau canvas
  static async analyzeHandwriting(userId, imageData, analysisType) {
    try {
      // Create analysis record
      const analysis = new Analysis({
        userId,
        analysisType,
        imageUrl: analysisType === "image" ? imageData : null,
        canvasData: analysisType === "canvas" ? imageData : null,
        status: "pending",
      });

      // TODO: Integrate dengan ML model untuk analyze
      // Untuk sekarang, mock analysis result
      const mockResult = this.getMockAnalysisResult();

      analysis.personalityType = mockResult.personalityType;
      analysis.traits = mockResult.traits;
      analysis.description = mockResult.description;
      analysis.status = "completed";

      await analysis.save();
      return analysis;
    } catch (error) {
      throw new Error(`Analysis failed: ${error.message}`);
    }
  }

  // Mock analysis result (replace dengan ML model nanti)
  static getMockAnalysisResult() {
    const personalities = [
      {
        type: "Optimist",
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
        type: "Introvert",
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
        type: "Creative",
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
        type: "Analytical",
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
        type: "Leader",
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
        type: "Dreamer",
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

  // Helper removed (getMockAnalysisResult)

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
