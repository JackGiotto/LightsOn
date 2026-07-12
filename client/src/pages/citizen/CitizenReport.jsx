import React, { useState } from "react";
import styles from "../../style/citizen/report.module.css";
import styles1 from "../../style/citizen/citizen.module.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ReportContext } from "./ReportContext";
import { useNavigate } from "react-router-dom";

export const CitizenReport = () => {
    const [problemType, setProblemType] = useState(null);
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

    const { reportLamp, setReportLamp } = useContext(ReportContext);

    const createReport = async () => {
        console.log(description)
        if (!problemType) {
            console.error("Select a malfunction type before submitting the report.");
            return;
        }

        try {
            const apiUrl = import.meta.env.VITE_API_URL;
            console.log("Creating report for lamp ID:", reportLamp, "with description:", description, "and problem type:", problemType);
            const response = await fetch(`${apiUrl}/report/new_report`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: "64f000000000000000000000",
                        description: description,
                        lightId: reportLamp,
                        malfunctionType: problemType,
                    })
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setReportLamp(null);
            navigate("/citizen");
        } catch (err) {
            console.error(err);
        }
    }

    const handleBack = () => {
        setReportLamp(null);
    }

    return (
        <div className={styles.container}>
            <Link className={styles.arrow} to="/citizen" onClick={handleBack}><img src="/left-chevron.png" width={20}></img></Link>
            <h1>Report</h1>
            <h3>Lampione {reportLamp}</h3>

            <h3>Select the malfunction type</h3>
            <ul className={styles.list}>
                <li onClick={() => setProblemType("Malfunzionamento")} className={problemType === "Malfunzionamento" ? styles.selected: ""}>Malfunzionamento</li>
                <li onClick={() => setProblemType("Rottura")} className={problemType === "Rottura" ? styles.selected: ""}>Rottura</li>
                <li onClick={() => setProblemType("Lampeggiante")} className={problemType === "Lampeggiante" ? styles.selected: ""}>Lampeggiante</li>
                <li onClick={() => setProblemType("Altro")} className={problemType === "Altro" ? styles.selected: ""}>Altro</li>
            </ul>
            <form className={styles.formContainer}>
                <label>Se vuoi aggiungere una descrizione o una foto</label>
                <input placeholder="Descrizione..." type="text" onChange={handleDescriptionChange} value={description}></input>
            </form>

            <button type="button" className={styles1.alertButton} onClick={createReport}>Segnala</button>
        </div>
    );
}