import { CitizenNavBar } from "../../components/citizen/CitizenNavBar.jsx";
import { Page } from "../../components/Page";
import { Link, Outlet } from "react-router";
import { MapContainer, TileLayer, ZoomControl} from 'react-leaflet'
import styles from "../../style/citizen/citizen.module.css";
import lampsData from "../dashboard/lamps.json";
import Light from "../../components/map/Light";

/*
<MapContainer style={{ height: "100%", width: "100%" }}
                center={position}
                zoom={16}
                scrollWheelZoom={false} zoomControl={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <ZoomControl position="bottomleft"></ZoomControl>
        
  </MapContainer>
  */

export const CitizenHome = () => {
    
  const position = [46.067069, 11.150347];

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
        
  </MapContainer>
  
  <Link className={styles.buttonContainer} to="/citizen/report">
    <button className={styles.alertButton}>Segnala</button>

  </Link>
        </div>
    );
}