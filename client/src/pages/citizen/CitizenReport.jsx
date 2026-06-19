import React from "react";
import styles from "../../style/citizen/report.module.css";
import styles1 from "../../style/citizen/citizen.module.css";
import { Link } from "react-router-dom";

export const CitizenReport = () => {

    return (
        <div className={styles.container}>
            <Link className={styles.arrow} to="/citizen"><img src="/left-chevron.png" width={20}></img></Link>
            <h1>Report</h1>
            
            <h3>Select the malfunction type</h3>
            <ul className={styles.list}>
                <li>Malfunzionamento</li>
                <li>Rottura</li>
                <li>Lampeggiante</li>
                <li>Altro</li>
            </ul>
            <form className={styles.formContainer}>
                <label>Se vuoi aggiungere una descrizione o una foto</label>
                <input placeholder="Descrizione..." type="text"></input>
            </form>
            
                <button className={styles1.alertButton}>Segnala</button>
        </div>
    );
}