import React from 'react';
import { Circle } from 'react-leaflet';

function Light({
  id,
  position,
  onLightClick,
  radius = 10,
  color = '#f5d76e',
  fillColor = '#ffe680',
  fillOpacity = 0.35,
  weight = 1,
  centerRadius = 4,
  centerColor = '#b8860b',
  centerFillColor = '#ffd54f',
  centerFillOpacity = 1,
  centerWeight = 1,
}) {
  const eventHandlers = {
    click: () => {
      onLightClick(id);
    },
  };

  return (
    <>
      {/* The outer light radius - NOT clickable */}
      <Circle
        center={position}
        radius={radius}
        pathOptions={{
          color,
          weight,
          fillColor,
          fillOpacity,
        }}
        interactive={false} // This makes the large circle ignore clicks
      />

      {/* The inner lamp post - CLICKABLE */}
      <Circle
        center={position}
        radius={centerRadius}
        pathOptions={{
          color: centerColor,
          weight: centerWeight,
          fillColor: centerFillColor,
          fillOpacity: centerFillOpacity,
        }}
        eventHandlers={eventHandlers} // Click handler is only on this circle
      />
    </>
  );
}

export default Light;
