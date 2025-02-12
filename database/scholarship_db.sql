CREATE DATABASE IF NOT EXISTS scholarship_db;
USE scholarship_db;

CREATE TABLE applicants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nama VARCHAR(100) NOT NULL,
    nilai_tes DECIMAL(5,2) NOT NULL,
    nilai_rapor DECIMAL(5,2) NOT NULL,
    ekstrakurikuler INT NOT NULL,
    skor_akhir DECIMAL(5,2) NOT NULL,
    keputusan ENUM('DITERIMA', 'CADANGAN', 'DITOLAK') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);