import React from "react";
import styles from "../../style/dashboard/avgage.module.css";
import lampsData from "../dashboard/lamps.json";

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
                            {
              lampsData.features.map((bulb) => (
                <li><p>Lampione {bulb.id.slice(5)}</p> <p>{Math.round(Math.random() * (22 - 0), 2)} Anni</p></li>
                
              ))
            }
                        </ul>
                    
                    </div>
    
                </div>
    
            </div>
    )
}