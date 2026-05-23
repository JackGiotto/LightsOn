import React from "react";
import styles from "../../Style/cittadino/report.module.css";

export const Report = () => {

    return (
        <div className={styles.container}>
            <p className={styles.arrow}>una bella freccia per tornare INDIETRO</p>
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
            <button>Segnala</button>
        </div>
    );
}