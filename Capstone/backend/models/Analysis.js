const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    analysisType: {
      type: String,
      enum: ["image", "canvas"],
      required: true,
    },
    imageUrl: String,
    canvasData: String,
    
    // --- TAMBAHKAN FIELD INI ---
    enneagramType: { 
      type: String, 
      // Contoh isi: "Tipe 1", "Tipe 6", dll.
    },
    // ---------------------------

    personalityType: {
      type: String,
      // Hapus enum jika Anda ingin tipe kepribadian lebih fleksibel 
      // atau biarkan jika sudah sesuai mapping
    },
    traits: {
      confidence: { type: Number, min: 0, max: 100 },
      creativity: { type: Number, min: 0, max: 100 },
      extraversion: { type: Number, min: 0, max: 100 },
      analyticalMind: { type: Number, min: 0, max: 100 },
      emotionalIntelligence: { type: Number, min: 0, max: 100 },
    },
    description: String,
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    errorMessage: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analysis", analysisSchema);