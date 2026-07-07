import React from 'react';
import { Marker, Circle, Popup } from 'react-leaflet';
import L from 'leaflet';

function Light({
  key,
  id,
  position,
  radius=10}) {

  return <>
      <svg style={{ width: 0, height: 0, position: 'absolute' }}>
        <defs>
          <radialGradient id="yellowFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="yellow" stopOpacity="1" />
            <stop offset="100%" stopColor="yellow" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      <svg style={{ width: 0, height: 0, position: 'absolute' }}>
        <defs>
          <radialGradient id="redFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="red" stopOpacity="1" />
            <stop offset="100%" stopColor="red" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      <Circle
          key={key}
          center={position}
          radius={radius}
          pathOptions={{
            fillColor: 'url(#yellowFade)',
            fillOpacity: 1,  /* Must be 1 so the gradient's own opacity works */
            stroke: false    /* Optional: removes the solid border line */
          }}
        > <Popup>
          Questo è il lampione {id}
        </Popup></Circle>
  </>;


}

export default Light;
