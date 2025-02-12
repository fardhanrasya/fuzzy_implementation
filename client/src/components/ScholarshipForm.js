import React, { useState } from 'react';
import axios from 'axios';
import ResultModal from './ResultModal';

export default function ScholarshipForm() {
  const [formData, setFormData] = useState({
    nama: '',
    nilaiTes: 0,
    nilaiRapor: 0,
    ekstrakurikuler: 0
  });
  
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/calculate', formData);
      setResult(response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Error:', error.response?.data);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="text-center mb-4">Formulir Beasiswa</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nama Lengkap</label>
              <input
                type="text"
                className="form-control"
                required
                onChange={(e) => setFormData({...formData, nama: e.target.value})}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Nilai Tes (0-100)</label>
              <input
                type="number"
                min="0"
                max="100"
                className="form-control"
                required
                onChange={(e) => setFormData({...formData, nilaiTes: parseInt(e.target.value)})}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Nilai Rapor (0-100)</label>
              <input
                type="number"
                min="0"
                max="100"
                className="form-control"
                required
                onChange={(e) => setFormData({...formData, nilaiRapor: parseInt(e.target.value)})}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Aktivitas Ekstrakurikuler (0-10)</label>
              <input
                type="number"
                min="0"
                max="10"
                className="form-control"
                required
                onChange={(e) => setFormData({...formData, ekstrakurikuler: parseInt(e.target.value)})}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Hitung Kelayakan</button>
          </form>
        </div>
      </div>
      
      <ResultModal 
        show={showModal}
        onHide={() => setShowModal(false)}
        result={result}
      />
    </div>
  );
}