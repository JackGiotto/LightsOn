import React, { useState, useEffect } from "react";
import styles from "../../style/dashboard/streetLamps.module.css";

export const StreetLamps = () => {
    const [uptime, setUptime] = useState({ sunrise: null, sunset: null });
    const [weather, setWeather] = useState(null);
    const [consumption, setConsumption] = useState(345.0);
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        inactive: 0,
        interventions: []
    });
    const [loading, setLoading] = useState(true);

    // Meteo e orari
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL;
                const response = await fetch(`${apiUrl}/api/weather`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setWeather(data.weather[0].main);

                setUptime({
                    sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    }),
                    sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    })
                });
            } catch (err) {
                console.error("Errore meteo:", err);
            }
        };

        fetchWeather();
    }, []);

    useEffect(() => {
        const maxVariation = 2.5;
        const intervalId = setInterval(() => {
            setConsumption(() => {
                const variation = (Math.random() * (maxVariation * 2)) - maxVariation;
                const newValue = 345.0 + variation;
                return parseFloat(newValue.toFixed(1));
            });
        }, 3000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const fetchLampStats = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL;
                const response = await fetch(`${apiUrl}/dashboard/lights/stats`, {
                    credentials: "include"
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setStats({
                    total: data.total || 0,
                    active: data.active || 0,
                    inactive: data.inactive || 0,
                    interventions: data.interventions || []
                });
                setLoading(false);
            } catch (err) {
                console.error("Errore nel caricamento delle statistiche:", err);
                setLoading(false);
            }
        };

        fetchLampStats();
    }, []);

    const getStatusLabel = (status) => {
        const labels = {
            'pending': 'In attesa',
            'working on': 'In lavorazione',
            'resolved': 'Chiuso'
        };
        return labels[status] || status;
    };

    if (loading) {
        return <div className={styles.container}>Caricamento...</div>;
    }

    return (
        <div className={styles.container}>
            <h1>Stato dei Lampioni</h1>

            <div className={styles.overviewElements}>
                <div className={`${styles.overviewElement} ${styles.active}`}>
                    <p>Lampioni attivi: {stats.active}</p>
                </div>
                <div className={`${styles.overviewElement} ${styles.inactive}`}>
                    <p>Lampioni inattivi: {stats.inactive}</p>
                </div>
                <div className={`${styles.overviewElement} ${styles.actual}`}>
                    <p>Consumo Attuale</p>
                    <p>{consumption} kWh</p>
                </div>

                <div className={`${styles.overviewElement} ${styles.worksContainer}`}>
                    <h3>Stato Interventi ({stats.interventions.length})</h3>
                    <ul className={styles.oldLampsList}>
                        {stats.interventions.length > 0 ? (
                            stats.interventions.map((intervention) => (
                                <li key={intervention.reportId || intervention.lightId}>
                                    <p>Lampione {intervention.lightId.slice(-6)}</p>
                                    <p className={styles.workDescription}>
                                        {getStatusLabel(intervention.status)}
                                    </p>
                                </li>
                            ))
                        ) : (
                            <li>Nessun intervento in corso</li>
                        )}
                    </ul>
                </div>

                <div className={styles.rightContainer}>
                    <div className={`${styles.overviewElement} ${styles.uptime}`}>
                        <p>Orari Accensione</p>
                        <p>Alba: {uptime.sunrise || '--:--'}</p>
                        <p>Tramonto: {uptime.sunset || '--:--'}</p>
                    </div>
                    <div className={`${styles.overviewElement} ${styles.weather}`}>
                        <p>Meteo</p>
                        <p>{weather || 'N/A'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};