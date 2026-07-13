import React, { useState, useEffect } from "react";
import styles from "../../style/dashboard/avgage.module.css";

export const AvgAge = () => {
    const [lights, setLights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [averageAge, setAverageAge] = useState(null);

    useEffect(() => {
        const fetchLamps = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL;
                const response = await fetch(`${apiUrl}/dashboard/lights/age`, {
                    credentials: "include"
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setLights(data);

                // Calcola l'età media (solo quelli con età non null)
                const ages = data.map(l => l.age).filter(age => age !== null);
                if (ages.length > 0) {
                    const avg = ages.reduce((sum, age) => sum + age, 0) / ages.length;
                    setAverageAge(Math.round(avg * 10) / 10);
                } else {
                    setAverageAge(null);
                }

                setLoading(false);
            } catch (err) {
                console.error("Errore nel caricamento dei lampioni:", err);
                setLoading(false);
            }
        };

        fetchLamps();
    }, []);

    // Prendi i primi 2 lampioni più recenti (sostituzioni recenti)
    const recentReplacements = [...lights]
        .filter(l => l.installationDate)
        .sort((a, b) => new Date(b.installationDate) - new Date(a.installationDate))
        .slice(0, 2);

    // Prendi tutti i lampioni con età > 4 anni (da cambiare)
    const oldLamps = lights.filter(l => l.age !== null && l.age > 4);

    if (loading) {
        return <div className={styles.container}>Caricamento...</div>;
    }

    return (
        <div className={styles.container}>
            <h1 style={styles.title}>Overview Età Media</h1>
            <div className={styles.overviewElements}>
                <div className={styles.leftElements}>
                    <div className={`${styles.overviewElement} ${styles.active}`}>
                        <h3>Età Media totale:</h3>
                        <p>{averageAge !== null ? `${averageAge} anni` : 'N/A'}</p>
                    </div>
                    <div className={`${styles.overviewElement} ${styles.inactive}`}>
                        <h3>Sostituzioni Recenti</h3>
                        {recentReplacements.length > 0 ? (
                            recentReplacements.map((lamp) => (
                                <p key={lamp.id}>Lampione {lamp.id.slice(-6)}</p>
                            ))
                        ) : (
                            <p>Nessuna sostituzione recente</p>
                        )}
                    </div>
                </div>
                <div className={styles.rightElements}>
                    <h3>Lampioni da Cambiare (età &gt; 4 anni)</h3>
                    <ul className={styles.oldLampsList}>
                        {oldLamps.length > 0 ? (
                            oldLamps.map((lamp) => (
                                <li key={lamp.id}>
                                    <p>Lampione {lamp.id.slice(-6)}</p>
                                    <p>{lamp.age !== null ? `${lamp.age} anni` : 'N/A'}</p>
                                </li>
                            ))
                        ) : (
                            <li>Nessun lampione da cambiare</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};