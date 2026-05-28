import React from "react";
import styles from "../../Style/settimane.module.css";
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import WeekDropdown from './Menu';
import { useState, useEffect } from "react";


function Overview({showOverview, setShowOverview})  {
  if(!showOverview) {
    return null
  }
  return(
          <div className={styles.overview}>
            <img className={styles.close} src="/close.png" width={15} onClick={() => setShowOverview(false)}></img>
            <ul className={styles.overviewElements}>
              <li className={styles.overviewElement}>
                <h3>346 Wh</h3>
                <p>Consumo totale</p>
              </li>
              <li className={styles.overviewElement}>
                <h3>346 Wh</h3>
                <p>Giorno con consumo maggiore</p>
              </li>
              <li className={styles.overviewElement}>
                <h3>346 Wh</h3>
                <p>Giorno con consumo minore:</p>
              </li>
              <li className={styles.overviewElement}>
                <h3>346 Wh</h3>
                <p>Consumo totale:</p>
              </li>
              <li className={styles.overviewElement}>
                <h3>346 Wh</h3>
                <p>Consumo totale</p>
              </li>
            </ul>
          </div>
  )
}

export const Settimane = () => {

  
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showOverview, setOverview] = useState(false);

    
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const xLabels = [
    'Lunedi',
    'Martedi',
    'Mercoledi',
    'Giovedi',
    'Venerdi',
    'Sabato',
    'Domenica',
  ];

  useEffect(() => {
    const handleResize = () => {setIsSmallScreen(window.innerWidth < 1300);};
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

    if (isSmallScreen) {
      return (
        <div className={styles.container}>
          <p className={styles.info}>Please view the dashboard on Desktop or Laptop.</p>
        </div>
      );
    }

    return (
        <div className={styles.container}>
          <div className={styles.top}>
            <h1 className={styles.title}>Highlights</h1>
            <div className={styles.top1}>
              <h2 className={styles.info}>+13% rispetto alla media questo Mercoledì</h2>
              <div className={styles.dateButton}>
                <WeekDropdown></WeekDropdown>
              </div>
            </div>
            <button className={styles.detailsButton} onClick={() => setOverview(!showOverview)}>Approfondisci</button>
          </div>

            
          <LineChart
            width={1100}
            height={600}
            series={[{ data: uData, label: 'Consumo W/h', area: true, showMark: false ,color: 'yellow'}]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
            sx={{
              [`& .${lineElementClasses.root}`]: {
                display: 'none',
              },
              '.MuiChartsAxis-tickLabel': {
                fill: '#828282',
                fontSize: '18px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                userSelect:"none"
              },
            }}
          />
          <Overview showOverview={showOverview} setShowOverview={setOverview}></Overview>


          
        </div>
    );
}