import React from "react";
import styles from "../../Style/settimane.module.css";
import { LineChart, lineElementClasses } from '@mui/x-charts/LineChart';
import WeekDropdown from './Menu';
import { useState, useEffect } from "react";


function Overview({showOverview, setShowOverview, overviewData})  {
  if(!showOverview) {
    return null
  }
  return(
          <div className={styles.overview}>
            <img className={styles.close} src="/close.png" width={15} onClick={() => setShowOverview(false)}></img>
            <ul className={styles.overviewElements}>
              <li className={styles.overviewElement}>
                <h3>{overviewData.totalConsumption} kWh</h3>
                <p>Consumo totale</p>
              </li>
              <li className={styles.overviewElement}>
                <h3>{overviewData.higherDay} kWh</h3>
                <p>Giorno con consumo maggiore</p>
              </li>
              <li className={styles.overviewElement}>
                <h3>{overviewData.lowestDay} kWh</h3>
                <p>Giorno con consumo minore</p>
              </li>
              <li className={styles.overviewElement}>
                <h3>{overviewData.lampConsumption} kWh</h3>
                <p>Consumo medio lampione</p>
              </li>
              <li className={styles.overviewElement}>
                  <h3>{overviewData.expectedCost} €</h3>
                <p>Costo Stimato Settimana</p>
              </li>
              <li className={styles.overviewElement}>
                <h3>346</h3>
                <p>Ore totali accensione</p>
              </li>
              <li className={styles.overviewElement}>
                <h3>4</h3>
                <p>Numero Segnalazioni</p>
              </li>
              <li className={styles.overviewElement}>
                <h3>35 kWh</h3>
                <p>Differenza Settimana Precedente</p>
              </li>
            </ul>
          </div>
  )
}

export const Settimane = () => {
  
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showOverview, setOverview] = useState(false);
    
  const uData = [33000, 33100, 29500, 34800, 35000, 38090, 34970];
  const xLabels = [
    'Lunedi',
    'Martedi',
    'Mercoledi',
    'Giovedi',
    'Venerdi',
    'Sabato',
    'Domenica',
  ];

  //  Capire se è meglio mettere l'inizializzazione nel useEffect
  const [overviewData, setOverviewData] = useState({
    higherDay: Math.max(...uData),
    lowestDay : Math.min(...uData),
    totalConsumption : uData.reduce((a, b) => a + b),
    lampConsumption: (uData.reduce((a, b) => a + b) / (7 * 18000)).toPrecision(2)
  });


  useEffect(() => {
    const fetchPrices = async () => {
      try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/energy-prices`);
      

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        //console.log(data);
        const medPrice = (data.hours.reduce((sum, currentHour) => sum + currentHour.price, 0) / 24.0).toFixed(2);
        //console.log(medPrice);
        setOverviewData(prev => ({
          ...prev,
          expectedCost: (uData.reduce((a, b) => a + b) * (medPrice / 1000)).toFixed(2)}
        ));

        
      } catch (err) {
        //setError(err.message);
        console.error(err);
      } finally {
        // volendo si può impostare un caricamento e poi quando è finito qua cambiare uno stato con il testo del caricamento
      }
    }

    fetchPrices();
    
  }, []);



  
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

          <Overview showOverview={showOverview} setShowOverview={setOverview} overviewData={overviewData}></Overview>


        </div>
    );
}