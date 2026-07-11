import React from "react";
import styles from "../../style/dashboard/avgage.module.css";
import lampsData from "../dashboard/lamps.json";
import { useState, useEffect } from "react";

export const AvgAge = () => {
    const [streetLamps, setStreetLamps] = useState([]);


    useEffect(() => {
            const fetchStreetLamps = async () => {
              try {
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/map/light/`);      
        
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
        
                    const data = await response.json();
                    setStreetLamps(data);
              } catch (err) {
                console.error(err);
              }
            }
        
            fetchStreetLamps();
    
        }, [])
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
                        {
                                lampsData.features.slice(0, 3).map((bulb) => (
                                    <p>Lampione {bulb.id.slice(5)}</p>
                
                                ))
                            }
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

                            {
                                streetLamps.map((bulb) => (
                                    <li><p>Lampione {bulb.id.slice(5)}</p> <p>{Math.round(Math.random() * (22 - 0), 2)} Anni</p></li>
                
                                ))
                            }
                        </ul>
                    
                    </div>
    
                </div>
    
            </div>
    )
}