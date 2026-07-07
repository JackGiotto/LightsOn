import React from "react";
import { CitizenNavBar } from "../../components/citizen/CitizenNavBar.jsx";
import { Page } from "../../components/Page";
import { Link, Outlet } from "react-router";
import { MapContainer, TileLayer, ZoomControl, useMapEvents} from 'react-leaflet'
import styles from "../../style/citizen/citizen.module.css";
import lampsData from "../dashboard/lamps.json";
import Light from "../../components/map/Light";
import { useState, Activity } from "react";
import { useNavigate } from "react-router";
import { ReportContext } from "./reportContext.jsx";
import styles1 from "../../style/citizen/upvote.module.css";


const UpvoteComponent = ({data, setUpvotePage}) => {

  const handleUpvoteRequest = async () => {
    try {
      const response = await fetch("/report/approve/", {
        method: "POST",
        body: JSON.stringify(data.id),
      });

      if(response.ok) {
        setUpvotePage(false)
      }

    } catch(error) {
      console.error(error)
    }
  }
  
      return (
          <div className={styles1.overview}>
              <img className={styles1.close} src="/close.png" width={15} onClick={() => setUpvotePage(false)}></img>
                <h1 className={styles1.title}>E' già stata eseguita una segnalazione per questo lampione</h1>
              <div className={styles1.container}>
              <p>Tipo di problema: {data.problemType}</p>
              <p>Voti: {data.upvoteCount}</p>
              <p></p>
              </div>
              <button onClick={handleUpvoteRequest} className={styles1.upvoteButton}>Aggiungi voto</button>
          </div>
      )
  }

export const CitizenHome = () => {

  //const {reportLamp} = useContext(ReportContext);
  const [lampSelected, setLampSelected] = useState(false);
  const position = [46.067069, 11.150347];
  const navigate = useNavigate();
  const [upvotePage, setUpvotePage] = useState(false);
  const [reportedLampData, setReportedLampData] = useState({});

  function MapEventsListener({ setLampSelected }) {
    useMapEvents({
      popupopen: () => {
      setLampSelected(true);
    },
      popupclose: () => {
        setLampSelected(false);
      },
    });
  
    return null;
  }

  const handleConditionalNavigation = async () => {
    try {
      //const response = await fetch(`/report/light/${reportLamp}`);
      //const data = await response.json();
      const isAlreadyReported = true;
      const data = {
        date: Date.now(),
        id: 42,
        producer: {
            name:"Daniel Lights",
            phone: "3454149835"
        },
        problemType: "Lampeggiante",
        upvoteCount: 3,
        descriptions: [
            "Buongiorno, desidero segnalare che il lampione situato in Via Roma, di fronte al civico 42, è completamente spento da almeno tre sere. La strada rimane in una zona d'ombra pericolosa per i pedoni. Chiedo un intervento di ripristino il prima possibile. Grazie.",
            "Buongiorno, vi scrivo per segnalare che in Via Verdi il lampione all'altezza dell'incrocio con Via Dante appare visibilmente inclinato e con la base del palo arrugginita/danneggiata. Temo possa essere un pericolo in caso di forte vento. Sarebbe opportuno un sopralluogo tecnico di sicurezza. Grazie per l'attenzione."
        ],
        lightId: "node/12833912385"
    };

      if (isAlreadyReported) {
        setUpvotePage(true);
        setReportedLampData(data);
      } else {
        navigate('/citizen/report');
      }
    } catch(error) {
       console.error(error); 
      }
  }

    return (
        <div className={styles.container}>
            <div className={styles.first}>
            <CitizenNavBar></CitizenNavBar>
            </div>
            
                


      <MapContainer style={{ height: "100%", width: "100%" }}
                center={position}
                zoom={16}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {
              lampsData.features.map((bulb) => (
                <Light
                  key={bulb.id}
                  id={bulb.id}
                  position={[
                    bulb.geometry.coordinates[1], 
                    bulb.geometry.coordinates[0]
                  ]}
                />
                
              ))
            }
        <MapEventsListener setLampSelected={setLampSelected} />
  </MapContainer>
  
  {lampSelected &&(
      <div className={styles.buttonContainer}>
        <button className={styles.alertButton} onClick={handleConditionalNavigation}>Segnala</button>
      </div>)
  }

  <Activity mode={upvotePage ? "visible" : "hidden"}>
                    <UpvoteComponent data={reportedLampData} setUpvotePage={setUpvotePage}></UpvoteComponent>
                  </Activity>
  
        </div>
    );
}