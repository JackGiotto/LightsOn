import React, { useCallback, useEffect, useRef, useState, useContext } from "react";
import "../../style/citizen/map.css";
import "leaflet/dist/leaflet.css";
import { CitizenNavBar } from "../../components/citizen/CitizenNavBar.jsx";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import styles from "../../style/citizen/citizen.module.css";
import styles1 from "../../style/citizen/upvote.module.css";
import Light from "../../components/map/Light";
import { useNavigate } from "react-router";
import { ReportContext } from "./ReportContext.jsx";
import { Activity } from "react";

const STATUS_LABELS = {
  'pending': 'In attesa',
  'working on': 'In lavorazione',
  'resolved': 'Chiuso'
};

const UpvoteComponent = ({ data, setUpvotePage, setReportLamp }) => {
  const handleUpvoteRequest = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/report/approve/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reportId: data.reportId }),
      });

      if (response.ok) {
        setUpvotePage(false);
        setReportLamp(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setUpvotePage(false);
    setReportLamp(null);
  };

  return (
    <div className={styles1.overview}>
      <img className={styles1.close} src="/close.png" width={15} onClick={handleClose} />
      <h1 className={styles1.title}>E' già stata eseguita una segnalazione per questo lampione</h1>
      <div className={styles1.container}>
        <p>Descrizione: {data.description}</p>
        <p>Stato: {STATUS_LABELS[data.state] || data.state}</p>
        <p>Voti: {data.approvedCounts}</p>
      </div>
      <button onClick={handleUpvoteRequest} className={styles1.upvoteButton}>Aggiungi voto</button>
    </div>
  );
};

const MapEventsHandler = ({ onLoad }) => {
  const map = useMapEvents({
    moveend: () => {
      const targetBounds = map.getBounds();
      onLoad({
        minLat: targetBounds.getSouth(),
        maxLat: targetBounds.getNorth(),
        minLng: targetBounds.getWest(),
        maxLng: targetBounds.getEast(),
      });
    },
  });

  useEffect(() => {
    const targetBounds = map.getBounds();
    onLoad({
      minLat: targetBounds.getSouth(),
      maxLat: targetBounds.getNorth(),
      minLng: targetBounds.getWest(),
      maxLng: targetBounds.getEast(),
    });
  }, [map, onLoad]);

  return null;
};

export const CitizenHome = () => {
  const position = [46.067069, 11.150347];
  const [liveLights, setLiveLights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [upvotePage, setUpvotePage] = useState(false);
  const [reportedLampData, setReportedLampData] = useState({});
  const currentViewIdRef = useRef(0);
  const navigate = useNavigate();
  const { reportLamp, setReportLamp } = useContext(ReportContext);

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

  const handleConditionalNavigation = useCallback(async () => {
    if (!reportLamp) return;

    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/report/light/${reportLamp}`);

      if (!response.ok) {
        throw new Error(`Failed to load report for lamp ${reportLamp}`);
      }

      const data = await response.json();

      if (data?.activeReport) {
        setUpvotePage(true);
        setReportedLampData(data.activeReport);
      } else {
        navigate("/citizen/report");
      }
    } catch (error) {
      console.error(error);
    }
  }, [navigate, reportLamp]);

  return (
    <div className={styles.container}>
      <div className={styles.first}>
        <CitizenNavBar />
      </div>

      <div style={{ height: "100%", width: "100%", position: "relative" }}>
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

          <MapEventsHandler onLoad={loadViewportProgressively} />

          {liveLights.map((bulb) => (
            <Light
              key={bulb.id}
              id={bulb.id}
              position={bulb.position}
              approvedCounts={bulb.approvedCounts}
            />
          ))}

          {reportLamp && (
            <div className={styles.buttonContainer}>
              <button className={styles.alertButton} onClick={handleConditionalNavigation}>
                Segnala
              </button>
              <button type="button" className={styles1.close} onClick={() => setReportLamp(null)}>
                Annulla
              </button>
            </div>
          )}

          <Activity mode={upvotePage ? "visible" : "hidden"}>
            <UpvoteComponent data={reportedLampData} setUpvotePage={setUpvotePage} setReportLamp={setReportLamp} />
          </Activity>
        </MapContainer>
      </div>
    </div>
  );
};