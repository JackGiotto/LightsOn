import React from "react";
import styles from "../../style/dashboard/avgage.module.css";

export const AvgAge = () => {
    return (
            <div className={styles.container}>
                <h1 style={styles.title}>Overview Età Media</h1>
                <div className={styles.overviewElements}>
                    <div className={styles.leftElements}>

                    <div className={ `${styles.overviewElement} ${styles.active}`}>
                        <p>Età Media complessiva: 8.7yr</p>
                    </div>
                    <div className={ `${styles.overviewElement} ${styles.inactive}`}>
                        <p>Sostituzioni Recenti</p>
                    </div>
                    </div>
                    <div className={styles.rightElements}>
                            <h3>Lampioni da Cambiare</h3>
                            
                        <ul className={styles.oldLampsList}>
                            <li><p>Lampione 1</p><p></p></li>
                            <li>Lampione 1</li>
                            <li>Lampione 1</li>
                            <li>Lampione 1</li>
                            <li>Lampione 1</li>
                            <li>Lampione 1</li>
                            <li>Lampione 1</li>
                            <li>Lampione 1</li>
                            <li>Lampione 1</li>
                            <li>Lampione 1</li>
                            <li>Lampione 1</li>
                            <li>Lampione 1</li>
                            <li>Lampione 1</li>
                            <li>Lampione 1</li>
                            <li>Lampione 1</li>
                            <li>Lampione 1</li>
                            <li>Lampione 1</li>
                            <li>Lampione 1</li>
                            <li>Lampione 1</li>
                            <li>Lampione 1</li>
                        </ul>
                    
                    </div>
    
                </div>
    
            </div>
    )
}