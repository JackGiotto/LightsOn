// dashboard/DashboardMap.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "../../style/dashboard/dashboardMap.module.css";
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import Light from "../../components/map/Light";

const MapEventsHandler = ({ onLoad }) => {
  const map = useMapEvents({
    moveend: () => {
      const bounds = map.getBounds();
      onLoad({
        minLat: bounds.getSouth(),
        maxLat: bounds.getNorth(),
        minLng: bounds.getWest(),
        maxLng: bounds.getEast(),
      });
    },
  });

  useEffect(() => {
    // Caricamento iniziale
    const bounds = map.getBounds();
    onLoad({
      minLat: bounds.getSouth(),
      maxLat: bounds.getNorth(),
      minLng: bounds.getWest(),
      maxLng: bounds.getEast(),
    });
  }, [map, onLoad]);

  return null;
};

export const DashboardMap = () => {
  const position = [46.067069, 11.150347];
  const [liveLights, setLiveLights] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentViewIdRef = useRef(0);

  const loadViewportProgressively = useCallback(async (bounds) => {
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
          viewId: myViewId,
        });

        const response = await fetch(`${apiUrl}/map/lights?${queryParams.toString()}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Failed step ${currentStep}`);
        }

        const data = await response.json();

        if (currentViewIdRef.current === myViewId) {
          setLiveLights((prev) => [...prev, ...data.lights]);
        }
      } catch (error) {
        console.error(`Error loading step ${currentStep}:`, error);
      }

      await new Promise((resolve) => setTimeout(resolve, 0));
    }

    if (currentViewIdRef.current === myViewId) {
      setLoading(false);
    }
  }, []);

  return (
    <div className={styles.mapContainer}>
      <input className={styles.searchBar} placeholder="Cerca un id" />

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

        <MapEventsHandler onLoad={loadViewportProgressively} />

        {liveLights.map((bulb) => (
          <Light
            key={bulb.id}
            id={bulb.id}
            position={bulb.position} // Deve essere [lat, lng]
            approvedCounts={bulb.approvedCounts} // se necessario
          />
        ))}

        {loading && (
          <div className={styles.loadingIndicator}>Caricamento lampioni...</div>
        )}
      </MapContainer>
    </div>
  );
};