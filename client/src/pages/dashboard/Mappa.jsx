import React from "react";
import styles from "../../Style/dashboard/mappa.module.css";
import { MapContainer, TileLayer } from 'react-leaflet'
import Light from "../../components/map/Light";
import LightDetails from "../../components/map/LightDetails";
import lampsData from "./ALLlamps.json";





export const Mappa = () => {

    
  const position = [46.067069, 11.150347];

  
  const bulbs = [
  { id: 2001, position: [46.067069, 11.150347] },
  { id: 2002, position: [46.066950, 11.150280] },
  { id: 2003, position: [46.066820, 11.150210] },
  { id: 2004, position: [46.066690, 11.150150] },
  { id: 2005, position: [46.066560, 11.150110] },
  { id: 2006, position: [46.066430, 11.150060] },
  { id: 2007, position: [46.066310, 11.150010] },
  { id: 2008, position: [46.066190, 11.149950] },
  { id: 2009, position: [46.066060, 11.149880] },
  { id: 2010, position: [46.065930, 11.149800] },
  { id: 2011, position: [46.065800, 11.149720] },
  { id: 2012, position: [46.065670, 11.149630] },
  { id: 2013, position: [46.065540, 11.149550] },
  { id: 2014, position: [46.065410, 11.149470] },
  { id: 2015, position: [46.065280, 11.149400] },
  { id: 2016, position: [46.065150, 11.149340] },
  { id: 2017, position: [46.065020, 11.149290] },
  { id: 2018, position: [46.064890, 11.149250] },
  { id: 2019, position: [46.064760, 11.149210] },
  { id: 2020, position: [46.064630, 11.149170] }
];



  

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