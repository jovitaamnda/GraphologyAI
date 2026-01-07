const AnalysisService = require("../services/analysisService");

// @route   POST /api/analysis/upload
// @desc    Upload dan analyze image
// @access  Private
exports.uploadImage = async (req, res) => {
  try {
    const { userId } = req.body;
    const imageData = req.file ? req.file.path : req.body.imageData;

    if (!imageData || !userId) {
      return res.status(400).json({ message: "Image data and userId required" });
    }

    const analysis = await AnalysisService.analyzeHandwriting(
      userId,
      imageData,
      "image"
    );

    res.status(201).json({
      message: "Analysis completed successfully",
      analysis,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   POST /api/analysis/canvas
// @desc    Analyze canvas drawing
// @access  Private
exports.analyzeCanvas = async (req, res) => {
  try {
    const { userId, canvasData } = req.body;

    if (!canvasData || !userId) {
      return res.status(400).json({ message: "Canvas data and userId required" });
    }

    const analysis = await AnalysisService.analyzeHandwriting(
      userId,
      canvasData,
      "canvas"
    );

    res.status(201).json({
      message: "Analysis completed successfully",
      analysis,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/analysis/:analysisId
// @desc    Get single analysis result
// @access  Private
exports.getAnalysis = async (req, res) => {
  try {
    const { analysisId } = req.params;

    const analysis = await AnalysisService.getAnalysis(analysisId);

    if (!analysis) {
      return res.status(404).json({ message: "Analysis not found" });
    }

    res.status(200).json(analysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/analysis/history/:userId
// @desc    Get user's analysis history
// @access  Private
exports.getUserHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const history = await AnalysisService.getUserAnalysisHistory(
      userId,
      parseInt(page),
      parseInt(limit)
    );

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   DELETE /api/analysis/:analysisId
// @desc    Delete analysis
// @access  Private
exports.deleteAnalysis = async (req, res) => {
  try {
    const { analysisId } = req.params;

    await AnalysisService.deleteAnalysis(analysisId);

    res.status(200).json({ message: "Analysis deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/admin/analyses
// @desc    Get all analyses (admin only)
// @access  Private/Admin
exports.getAllAnalyses = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;

    const analyses = await AnalysisService.getAllAnalyses(
      parseInt(page),
      parseInt(limit)
    );

    res.status(200).json(analyses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/admin/analysis-stats
// @desc    Get analysis statistics (admin only)
// @access  Private/Admin
exports.getStatistics = async (req, res) => {
  try {
    const stats = await AnalysisService.getStatistics();

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
