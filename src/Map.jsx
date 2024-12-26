import { useState } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';

import './css/map.css'

function Map(props) {
// 
    const {lat} = props;
    const {lon} = props;
// const lat = 51.505;
// const lon = -0.09;

    // let [ mapSrc, setMapSrc] = useState();
    return ( <>
      <MapContainer center={[lat, lon]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>

      {/* <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer> */}
 </> )
 }

export default Map;  