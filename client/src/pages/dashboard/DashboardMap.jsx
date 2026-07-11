import React from "react";
import styles from "../../style/dashboard/dashboardMap.module.css";
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import Light from "../../components/map/Light";
import LightDetails from "../../components/map/LightDetails";
import lampsData from "./lamps.json";
import { useEffect, useState } from "react";


function MapSearchController({ nodes, selectedNodeId }) {
  const map = useMap();

  useEffect(() => {
    if (!selectedNodeId) return;

    // Find the coordinates of the selected node
    const targetNode = nodes.find(node => node.id === selectedNodeId);
    
    if (targetNode) {
      // Smoothly pan and zoom to the circle's position
      map.flyTo(targetNode.coordinates, 14, {
        animate: true,
        duration: 1.5
      });
    }
  }, [selectedNodeId, nodes, map]);

  return null; // This component doesn't render HTML, it just controls the map
}


export const DashboardMap = () => {

    
  const position = [46.067069, 11.150347];
  

    return (
        <>
            <div className={styles.mapContainer}>

            <input className={styles.searchBar} placeholder="Cerca un id"></input>
            
                
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