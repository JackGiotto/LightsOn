import React from "react";
import styles from "../../Style/cittadino/report.module.css";
import styles1 from "../../Style/cittadino/citizen.module.css";
import { Link } from "react-router-dom";

export const Report = () => {

    return (
        <div className={styles.container}>
            <Link className={styles.arrow} to="/cittadino"><img src="/left-chevron.png" width={20}></img></Link>
            <h1>Segnala</h1>
            
            <h3>Seleziona il tipo di malfunzionamento</h3>
            <ul className={styles.list}>
                <li>Malfunzionamento</li>
                <li>Rottura</li>
                <li>Lampeggiante</li>
                <li>Altro</li>
            </ul>
            <form>
                <label>Se vuoi aggiungere una descrizione o una foto</label>
                <input placeholder="Descrizione..." type="text"></input>
            </form>
            
                <button className={styles1.alertButton}>Segnala</button>
        </div>
    );
}