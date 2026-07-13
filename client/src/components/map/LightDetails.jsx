import React from 'react';
import './LightDetails.css';

const LightDetails = ({ lightId, onReport, onClose, isOpen }) => {
  return (
    <div className={`light-details-container ${isOpen ? 'open' : ''}`}>
      <div className="light-details-content">
        <h3>Dettagli Lampione</h3>
        <p><strong>Codice lampione:</strong> {lightId || '...'}</p>
        <p><strong>Consumo:</strong> 200W</p>
        <p><strong>Orario accensione:</strong> 20:00</p>
        <p><strong>Orario spegnimento:</strong> 05:00</p>
        <div className="light-details-actions">
          <button className="report-button" onClick={() => onReport(lightId)}>
            SEGNALA
          </button>
          <button className="close-button" onClick={onClose}>
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};

export default LightDetails;
