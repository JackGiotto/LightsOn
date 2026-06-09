import React from "react";
import styles from "../../style/dashboard/streetLamps.module.css";

export const StreetLamps = () => {
    return (
        <div className={styles.container}>
            <h1>Stato dei Lampioni</h1>
            <div className={styles.overviewElements}>
                <div className={ `${styles.overviewElement} ${styles.active}`}>
                    <p>Lampioni attivi: 432</p>
                </div>
                <div className={ `${styles.overviewElement} ${styles.inactive}`}>
                    <p>Lampioni inattivi: 4</p>
                </div>
                <div className={styles.overviewElement} id="active">
                    <p>Lampioni attivi: 432 (verde)</p>
                </div>
            </div>
            <p>Statistiche</p>
            <p>Povo</p>

        </div>
    )
}