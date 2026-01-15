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

      // 3. Mapping Hasil AI ke Knowledge Base (Buku & Jurnal)
      // aiResult balikin: { prediction: "Tipe 8", confidence: 0.95 }
      
      const knowledge = ENNEAGRAM_KNOWLEDGE_BASE[aiResult.prediction] || ENNEAGRAM_KNOWLEDGE_BASE['Tipe 1']; // Default fallback

      // 4. Susun Data Final untuk Database
      analysis.enneagramType = aiResult.prediction; // "Tipe 8"
      analysis.personalityType = knowledge.name; // "The Challenger"
      analysis.description = knowledge.desc;
      analysis.confidenceScore = aiResult.confidence; // Jaga confidence asli (misal 95%)

      // 5. Simpan Analisis Fitur Grafologi (Slant, Size, Pressure)
      // Ini bagian penting: Menyimpan alasan KENAPA dia Tipe 8 berdasarkan teori
      analysis.graphologyAnalysis = {
        slant: knowledge.features.slant,
        size: knowledge.features.size,
        baseline: knowledge.features.baseline,
        
        // Khusus Pressure, kita highlight peran Histogram Equalization (HE)
        pressure: {
          val: knowledge.features.pressure.val,
          meaning: knowledge.features.pressure.meaning,
          technique_note: "Deteksi ketebalan/tekanan dioptimalkan menggunakan Histogram Equalization (HE)."
        }
      };

      analysis.status = "completed";
      await analysis.save();

      console.log(`[Service] Analisis Sukses untuk User ${userId}: ${aiResult.prediction}`);
      return analysis;

    } catch (error) {
      console.error(`[Service Error] ${error.message}`);
      
      analysis.status = "failed";
      analysis.errorMessage = error.message;
      await analysis.save();
      
      throw new Error(error.message);
    }
  }

  /**
   * Helper: Request ke Flask Python
   */
  static async callFlaskAI(imageData, analysisType) {
    const aiUrl = process.env.FLASK_AI_URL;
    if (!aiUrl) throw new Error("FLASK_AI_URL belum disetting di .env");

    try {
      const form = new FormData();
      
      // Handle File Upload vs Base64 Canvas
      if (analysisType === 'canvas') {
        // Hapus header base64 (data:image/png;base64,...)
        const base64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        form.append('file', buffer, { filename: 'canvas.png' });
      } else {
        // Upload File Biasa
        if (!fs.existsSync(imageData)) throw new Error("File gambar tidak ditemukan");
        form.append('file', fs.createReadStream(imageData));
      }

      console.log(`[Axios] Mengirim gambar ke AI: ${aiUrl}`);

      const response = await axios.post(aiUrl, form, {
        headers: { ...form.getHeaders() },
        timeout: 60000 // 60 detik timeout (AI kadang lambat kalau cold start)
      });

      // Response dari Python: { status: 'success', prediction: 'Tipe 8', confidence: '87.50%' }
      const data = response.data;

      if (data.error) throw new Error(data.error);

      // Parsing hasil (misal: "Tipe 8" diambil dari response)
      return {
        prediction: data.prediction, // Wajib string "Tipe X"
        confidence: parseFloat(data.confidence) || 0 // Ubah string "87.50%" jadi float
      };

    } catch (error) {
        // Error handling spesifik
        if (error.code === 'ECONNREFUSED') {
            throw new Error("Server AI (Flask) tidak terhubung/mati.");
        }
        throw new Error(`Gagal analisis AI: ${error.message}`);
    }
  }

  // --- FUNGSI GET DATA UNTUK DASHBOARD/FRONTEND ---

  static async getAnalysisHistory(userId) {
     return await Analysis.find({ userId }).sort({ createdAt: -1 });
  }

  static async getAnalysisDetail(id) {
     return await Analysis.findById(id);
  }
}

module.exports = AnalysisService;