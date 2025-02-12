import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function ResultModal({ show, onHide, result }) {
  const getDecisionColor = () => {
    if (!result) return '';
    return result.keputusan === 'DITERIMA' ? 'text-success' :
      result.keputusan === 'CADANGAN' ? 'text-warning' : 'text-danger';
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Hasil Perhitungan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {result && (
          <>
            <h4 className={`text-center ${getDecisionColor()}`}>
              {result.keputusan}
            </h4>
            <p>Nama: {result.nama}</p>
            <p>Skor Akhir: {result.skor_akhir.toFixed(2)}</p>
            <p>Kriteria:
              <ul>
                <li>Nilai Tes: {result.nilai_tes}</li>
                <li>Nilai Rapor: {result.nilai_rapor}</li>
                <li>Ekstrakurikuler: {result.ekstrakurikuler}</li>
              </ul>
            </p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Tutup</Button>
      </Modal.Footer>
    </Modal>
  );
}