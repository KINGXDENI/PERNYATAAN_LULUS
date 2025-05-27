// routes/motivasi.js
const express = require('express');
const router = express.Router();
const {
    GoogleGenerativeAI
} = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', async (req, res) => {
    const {
        status
    } = req.body;

    const prompt = status === 'LULUS' ?
        "Buatkan kalimat motivasi pendek yang membangkitkan semangat untuk siswa SD yang baru saja lulus." :
        "Buatkan kalimat motivasi pendek yang membesarkan hati untuk siswa SD yang belum lulus.";

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash"
        });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({
            success: true,
            motivasi: text
        });
    } catch (error) {
        console.error('Error dari Gemini:', error.message);
        res.status(500).json({
            success: false,
            message: 'Gagal mengambil motivasi dari Gemini.'
        });
    }
});

module.exports = router;
