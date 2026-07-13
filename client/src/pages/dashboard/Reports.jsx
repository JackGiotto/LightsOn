import React from "react";
import styles from"../../style/dashboard/reports.module.css";
import { useState, useEffect } from "react";

const STATUS_LABELS = {
    'pending': 'In attesa',
    'working on': 'In lavorazione',
    'resolved': 'Chiuso'
};

const STATUS_CLASSES = {
    'pending': 'statusPending',
    'working on': 'statusWorking',
    'resolved': 'statusResolved'
};

const Overview = ({showOverview, setShowOverview, description}) =>  {
  if(!showOverview) {
    return null
  }

  if (!description) {
    return (
        <div className={styles.overview}>
            <img className={styles.close} src="/close.png" width={15} onClick={() => setShowOverview(false)}></img>
            <h3>Nessuna Descrizione per questa segnalazione</h3>
          </div>
    )
  }

  return(
          <div className={styles.overview}>
            <img className={styles.close} src="/close.png" width={15} onClick={() => setShowOverview(false)}></img>
            <h1>Descrizione</h1>
            <p>{description}</p>
          </div>
  )
}

const Report = ({report, onStatusChange}) => {

    const [showOverview, setOverview] = useState(false);
    const isClosed = report.status === 'resolved';

    const handleCall = (number) => {
        if (number) {
            window.location.href = `tel:+39${number}`;
        } else {
            alert("Numero di telefono non disponibile per questo produttore.");
        }
    };

    const handleStatusChange = (event) => {
        const newStatus = event.target.value;

        if (newStatus === 'resolved') {
            const confirmed = window.confirm(
                "Sei sicuro di voler chiudere questa segnalazione? Verrà rimossa dal lampione e non potrà più essere riaperta."
            );
            if (!confirmed) {
                return;
            }
        }

        onStatusChange(report.id, newStatus);
    };

    return (
        <li className={`${styles.reportElement} ${isClosed ? styles.reportElementClosed : ''}`}>
                            <div className={styles.section}>
                                <p>{new Date(report.date).toLocaleDateString('it-IT', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                })}</p>
                                <p className={styles.lampId}>Lampione {report.id}</p>
                                <p>Produttore<br></br>{report.producer.name}</p>
                            </div>

                            <div className={styles.section}>
                                <button className={styles.contactButton}  onClick={() => setOverview(!showOverview)}>{report.problemType}</button>
                                <button className={styles.contactButton} onClick={() => handleCall(report.producer.phone)}><img src="/phone-call.png" width={30} height={30}></img>Contatta l'assistenza</button>
                                <p><img src="/up-arrow.png" width={30}height={30}></img>{report.upvoteCount} upvote</p>
                            </div>

                            <div className={styles.section}>
                                <label className={styles.statusLabel}>
                                    Stato
                                    <select
                                        className={`${styles.statusSelect} ${styles[STATUS_CLASSES[report.status]] || ''}`}
                                        value={report.status}
                                        onChange={handleStatusChange}
                                        disabled={isClosed}
                                    >
                                        {Object.entries(STATUS_LABELS).map(([value, label]) => (
                                            <option key={value} value={value}>{label}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            <Overview showOverview={showOverview} setShowOverview={setOverview} description={report.description}></Overview>
                        </li>
    )
}



export const Reports = () => {

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
                const response = await fetch(`${apiUrl}/report/all`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setReports(data.reports || []);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    const handleStatusChange = async (reportId, newStatus) => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            const response = await fetch(`${apiUrl}/report/status`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ reportId, status: newStatus }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            setReports((prev) =>
                prev.map((r) => (r.id === reportId ? { ...r, status: newStatus } : r))
            );
        } catch (err) {
            console.error(err);
            alert("Non è stato possibile aggiornare lo stato della segnalazione.");
        }
    };

    return (
        <div className={styles.container}>
            <h1>Segnalazioni  <img src="/upvote.png" width={50}height={50}></img></h1>

            {loading && <p>Caricamento...</p>}
            {error && <p>Errore nel caricamento delle segnalazioni: {error}</p>}
            {!loading && !error && reports.length === 0 && <p>Nessuna segnalazione al momento.</p>}

            <ul className={styles.reportList}>
                {
                    [...reports].sort((a, b) => {
                        const aClosed = a.status === 'resolved';
                        const bClosed = b.status === 'resolved';
                        if (aClosed !== bClosed) {
                            return aClosed ? 1 : -1;
                        }
                        return b.upvoteCount - a.upvoteCount;
                    }).map((report) => (
                        <Report report={report} onStatusChange={handleStatusChange} key={report.id}></Report>
                    ))
                }
            </ul>
        </div>
    );
}