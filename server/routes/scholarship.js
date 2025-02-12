const express = require('express');
const router = express.Router();
const db = require('../config/database');
const { calculateSugeno } = require('../config/fuzzy');

router.post('/calculate', async (req, res) => {
    try {
        const { nama, nilaiTes, nilaiRapor, ekstrakurikuler } = req.body;
        
        // Validasi input
        if (!nama || isNaN(nilaiTes) || isNaN(nilaiRapor) || isNaN(ekstrakurikuler)) {
            return res.status(400).json({ error: 'Input tidak valid' });
        }

        // Hitung fuzzy
        const result = calculateSugeno(nilaiTes, nilaiRapor, ekstrakurikuler);

        // Simpan ke database
        const [dbResult] = await db.promise().query(
            'INSERT INTO applicants (nama, nilai_tes, nilai_rapor, ekstrakurikuler, skor_akhir, keputusan) VALUES (?, ?, ?, ?, ?, ?)',
            [nama, nilaiTes, nilaiRapor, ekstrakurikuler, result.skor_akhir, result.keputusan]
        );

        res.json({
            ...result,
            nama,
            nilai_tes: nilaiTes,
            nilai_rapor: nilaiRapor,
            ekstrakurikuler
        });

    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;