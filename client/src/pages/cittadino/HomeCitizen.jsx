import { NavBarCitizen } from "../../Components/cittadino/NavBarCitizen";
import { Page } from "../../Components/Page";
import { Outlet } from "react-router";
import { MapContainer, TileLayer, ZoomControl} from 'react-leaflet'
import styles from "../../Style/cittadino/citizen.module.css";
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

export const HomeCitizen = () => {
    
  const position = [46.067069, 11.150347];

    return (
        <div className={styles.container}>
            <div className={styles.first}>
            <NavBarCitizen></NavBarCitizen>
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

  <div className={styles.buttonContainer}>
    <button className={styles.alertButton}>Segnala</button>

  </div>
        </div>
    );
}