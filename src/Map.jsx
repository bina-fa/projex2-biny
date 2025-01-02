import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';//אחרי התקנת הספריה ייבוא האלמנטים השימושיים באפליקציה זו
import 'leaflet/dist/leaflet.css' // css ייבוא דף  חיצוני

import './css/map.css'

function Map(props) {

    const {lat} = props;
    const {lon} = props;

    return ( <>
    {/* center- זה הנקודות המובחרות שמציגות נקודה על המפה 
        -----
    zoom -מרחק וגדל הזום על הכתובת במפה
    ----
    scrollWheelZoom -  האם ניתן להגדיל את המפה לאחר הבחירה של האזור -להגדיל זום
    */}

      <MapContainer center={[lat, lon]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" //בקשה לתמונת מפה
        />
        {/* Marker הוא הסמן */}
        <Marker position={[lat, lon]}>
          <Popup>
            {/* כשלוחצים על הסמן מוקפץ המשפט הבא */}
           a good place. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
 </> )
 }

export default Map;  