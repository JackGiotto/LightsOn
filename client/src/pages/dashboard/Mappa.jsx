import React from "react";
import styles from "../../Style/dashboard/mappa.module.css";
import { MapContainer, TileLayer } from 'react-leaflet'
import Light from "../../components/map/Light";
import LightDetails from "../../components/map/LightDetails";
import lampsData from "./lamps.json";





export const Mappa = () => {

    
  const position = [46.067069, 11.150347];
  

    return (
        <>
            <div className={styles.mapContainer}>
            
                
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
  
            </div>


        </>
    )
}