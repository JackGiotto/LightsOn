import "../../style/citizen/map.css";
import 'leaflet/dist/leaflet.css';
import React, { useState, useRef, useEffect } from 'react';
import { CitizenNavBar } from "../../components/citizen/CitizenNavBar.jsx";
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import styles from "../../style/citizen/citizen.module.css";
import Light from "../../components/map/Light";

const MapEventsHandler = ({ onLoad }) => {
  const map = useMapEvents({
    moveend: () => {
      const targetBounds = map.getBounds();
      onLoad({
        minLat: targetBounds.getSouth(),
        maxLat: targetBounds.getNorth(),
        minLng: targetBounds.getWest(),
        maxLng: targetBounds.getEast()
      });
    }
  });

  useEffect(() => {
    if (map) {
      const targetBounds = map.getBounds();
      onLoad({
        minLat: targetBounds.getSouth(),
        maxLat: targetBounds.getNorth(),
        minLng: targetBounds.getWest(),
        maxLng: targetBounds.getEast()
      });
    }
  }, []);

  return null;
};

export const CitizenHome = () => {
  const position = [46.067069, 11.150347];
  const [liveLights, setLiveLights] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentViewIdRef = useRef(0);

  const loadViewportProgressively = async (bounds) => {
    setLoading(true);
    setLiveLights([]);

    const myViewId = Date.now().toString();
    currentViewIdRef.current = myViewId;
    const apiUrl = import.meta.env.VITE_API_URL;

    for (let currentStep = 1; currentStep <= 3; currentStep++) {
      if (currentViewIdRef.current !== myViewId) break;

      try {
        const queryParams = new URLSearchParams({
          minLat: bounds.minLat.toString(),
          maxLat: bounds.maxLat.toString(),
          minLng: bounds.minLng.toString(),
          maxLng: bounds.maxLng.toString(),
          step: currentStep.toString(),
          viewId: myViewId
        });

        const response = await fetch(`${apiUrl}/map/lights?${queryParams.toString()}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: "include"
        });

        if (!response.ok) throw new Error(`Failed step ${currentStep}`);
        const data = await response.json();

        if (currentViewIdRef.current === myViewId) {
          setLiveLights((prev) => [...prev, ...data.lights]);
        }
      } catch (error) {
        console.error(`Error loading step ${currentStep}:`, error);
      }

      await new Promise(resolve => setTimeout(resolve, 0));
    }

    if (currentViewIdRef.current === myViewId) {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.first}>
        <CitizenNavBar />
      </div>

      <div style={{ height: "100%", width: "100%", position: 'relative' }}>
        {loading && <div className={styles.mapLoadingIndicator}>Progressive load...</div>}

        <MapContainer
          style={{ height: "100%", width: "100%" }}
          center={position}
          zoom={16}
          minZoom={10}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Pass the loader down to the isolated event handler wrapper */}
          <MapEventsHandler onLoad={loadViewportProgressively} />

          {liveLights.map((bulb) => (
            <Light
              key={bulb.id}
              id={bulb.id}
              position={bulb.position}
            />
          ))}
        </MapContainer>
      </div>
    </div>
  );
};