import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './map.css';
import Light from '../../components/map/Light';
import LightDetails from '../../components/map/LightDetails';

function MapEvents({ setCorners }) {
  const map = useMapEvents({
    moveend: () => {
      const bounds = map.getBounds();
      setCorners({
        topLeft: bounds.getNorthWest(),
        bottomRight: bounds.getSouthEast(),
      });
    },
  });

  return null;
}

export const MapPage = () => {
  const [isNightMode, setIsNightMode] = useState(true); // Default to dark mode
  const position = [46.067069, 11.150347];
  const bulb = { id: 2001, position: [46.0672, 11.1506] };
  const [, setCorners] = useState(null);
  const [selectedLight, setSelectedLight] = useState(null);

  const changeNightMode = () => {
    setIsNightMode(!isNightMode)
  }

  const handleReport = (lightId) => {
    console.log(`Report button clicked for light: ${lightId}`);
  };

  return (
    <div className="map-page-wrapper">
      <MapContainer
        center={position}
        zoom={20}
        className={`map-container ${isNightMode ? 'night-mode' : ''}`}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        <Light
          id={bulb.id}
          position={bulb.position}
          onLightClick={() => setSelectedLight(bulb.id)}
        />

        <MapEvents setCorners={setCorners} />
      </MapContainer>

      <LightDetails
        lightId={selectedLight}
        onReport={handleReport}
        onClose={() => setSelectedLight(null)}
        isOpen={!!selectedLight}
      />
    </div>
  );
};
