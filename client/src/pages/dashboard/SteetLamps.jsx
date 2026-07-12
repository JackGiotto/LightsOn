import React from "react";
import styles from "../../style/dashboard/streetLamps.module.css";
import { useEffect, useState } from "react";

export const StreetLamps = () => {

    const [uptime, setUptime] = useState({sunrise: null ,sunset: null});
    const [weather, setWeather] = useState(null);
    const [consumption, setConsumption] = useState(345.0);
    const [streetLamps, setStreetLamps] = useState([]);


    useEffect(() => {
        const fetchWeather = async () => {
          try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/weather`);
          
    
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(data.sys.sunrise);
            console.log(data.weather[0].main)
            setWeather(data.weather[0].main);

            setUptime({
                sunrise: new Date(data.sys.sunrise* 1000).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false // This is the magic property that forces 24-hour format!
                    }),
                sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false // This is the magic property that forces 24-hour format!
                    })
            });
            
          } catch (err) {
            console.error(err);
          }
        }
    
        fetchWeather();
        
      }, []);

    useEffect(() => {
        const maxVariation = 2.5;
        const intervalId = setInterval(() => {
        setConsumption(() => {
            const variation = (Math.random() * (maxVariation * 2)) - maxVariation;
            const newValue = 345.0 + variation; 
        
            return parseFloat(newValue.toFixed(1));
        });
        }, 3000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const fetchStreetLamps = async () => {
          try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/report/light/`);      
    
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

            <h1>Stato dei Lampioni</h1>


            <div className={styles.overviewElements}>

                <div className={ `${styles.overviewElement} ${styles.active}`}>
                    <p>Lampioni attivi: 1432</p>
                </div>
                <div className={ `${styles.overviewElement} ${styles.inactive}`}>
                    <p>Lampioni inattivi: 4</p>
                </div>
                <div className={ `${styles.overviewElement} ${styles.actual}`}>
                    <p>Consumo Attuale</p>
                    <p>{consumption} kWh</p>
                </div>



                <div className={ `${styles.overviewElement} ${styles.worksContainer}`}>
                    <h3>Stato Interventi</h3>
                    <ul className={styles.oldLampsList}>
                        <li><p>Lampione 12833898282</p><p className={styles.workDescription}>in corso</p></li>
                        <li><p>Lampione 12833912385</p><p className={styles.workDescription}>in corso</p></li>
                        <li><p>Lampione 13002153672</p><p className={styles.workDescription}>in corso</p></li>
                        <li><p>Lampione 13159720838</p><p className={styles.workDescription}>in corso</p></li>
                        {streetLamps.map((streetLamp) => {
                            <li>Lampione {streetLamp.lightId} in corso</li>
                        })}
                    </ul>
                </div>



                <div className={styles.rightContainer}>
                    <div className={ `${styles.overviewElement} ${styles.uptime}`}>
                        <p>Orari Accensione</p>
                        <p>{uptime.sunrise}</p>
                        <p>{uptime.sunset}</p>
                    </div>
                    <div className={ `${styles.overviewElement} ${styles.weather}`}>
                        <p>Meteo</p>
                        <p>{weather}</p>
                    </div>
                </div>



            </div>

        </div>
    )
}