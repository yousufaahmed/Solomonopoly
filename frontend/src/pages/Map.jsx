import React from "react";
import '../styles/Map.css'
import Navbar from "../components/navbar"; 
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"
import { Icon } from "leaflet";
import BinIcon from "../assets/bin.png";
import BusIcon from "../assets/bus.png";
import CycleIcon from "../assets/cycle.png";
import MarkerClusterGroup from "react-leaflet-cluster";

const Map = () => {

    const markers = [
        {
            geocode: [50.736038, -3.536274],
            popUp: "Peter Chalk Recycling Bin Location",
            type: "recycling"
        },
        {
            geocode: [50.736071, -3.535216],
            popUp: "INTO Exeter Recycling Bin Location",
            type: "recycling"
        },
        {
            geocode: [50.735750, -3.533786],
            popUp: "Forum Recycling Bin Location",
            type: "recycling"
        },
        {
            geocode: [50.734503, -3.534985],
            popUp: "Queens Building Recycling Bin Location",
            type: "recycling"
        },
        {
           geocode: [50.738343, -3.530448],
           popUp: "Innovation Center Recycling Bin Location",
           type: "recycling"
        },

        {
            geocode: [50.73759377334955, -3.5371114867624835],
            popUp: "Sports Hall Cycle Parking",
            type: "cycling"
        },
        {
            geocode: [50.73670275598379, -3.542742464430029],
            popUp: "Birks Grange Village Cycle Parking",
            type: "cycling"
        },
        {
            geocode: [50.736209797388284, -3.534701789289723],
            popUp: "Stocker Road Cycle Parking",
            type: "cycling"
        },
        {
            geocode: [50.73663177817246, -3.5316384288353557],
            popUp: "Amory Cycle Parking",
            type: "cycling"
        },
        {
           geocode: [50.73348400845263, -3.534052016277679],
           popUp: "Old Library Cycle Parking",
           type: "cycling"
        },
        {
            geocode: [50.736600988400696, -3.53461373113026],
            popUp: "North Park Road Bus Stop",
            type: "bus"
         },
         {
            geocode: [50.73368461390534, -3.5329902188232167],
            popUp: "Poole Gate Bus Stop",
            type: "bus"
         },
         {
            geocode: [50.734893495835024, -3.535688114274627],
            popUp: "Queens Drive Bus Stop",
            type: "bus"
         },
         {
            geocode: [50.73291081455357, -3.5377914313286225],
            popUp: "Knightley Bus Stop",
            type: "bus"
         },
         {
            geocode: [50.732016601299925, -3.5388981151458423],
            popUp: "Streatham Rise Bus Stop",
            type: "bus"
         },
         // --- St Luke's Campus Markers (using same types) ---

    // Recycling bins (type: "recycling")
    {
        geocode: [50.7226091525876, -3.5166492604841393],
        popUp: "St Luke's Campus Recycling Bin 1",
        type: "recycling"
      },
      {
        geocode: [50.72262273691108, -3.5178508901041625],
        popUp: "St Luke's Campus Recycling Bin 2",
        type: "recycling"
      },
      {
        geocode: [50.722578459684385, -3.5184094580925396],
        popUp: "St Luke's Campus Recycling Bin 3",
        type: "recycling"
      },
      {
        geocode: [50.7232866125362, -3.5160661236098982],
        popUp: "St Luke's Campus Recycling Bin 4",
        type: "recycling"
      },
      {
        geocode: [50.723559917561886, -3.517352667757073],
        popUp: "St Luke's Campus Recycling Bin 5",
        type: "recycling"
      },
  
      // Cycle parking (type: "cycling")
      {
        geocode: [50.72334388280403, -3.5170913928817926],
        popUp: "St Luke's Campus Cycle Parking 1",
        type: "cycling"
      },
      {
        geocode: [50.72235438137494, -3.5158626767506753],
        popUp: "St Luke's Campus Cycle Parking 4",
        type: "cycling"
      },
  
      // Bus stops (type: "bus")
      {
        geocode: [50.723247483374585, -3.5179963979106565],
        popUp: "College Road Bus Stop",
        type: "bus"
      },
      {
        geocode: [50.72375688587017, -3.517181006382784],
        popUp: "St Lukes Campus Bus Stop ",
        type: "bus"
      },
      {
        geocode: [50.72358368964303, -3.5159203681653493],
        popUp: "Waitrose Bus Stop 3",
        type: "bus"
      }
    ];

    const icons = {
        recycling: new Icon({
        iconUrl: BinIcon,
        iconSize: [25,25]
    }),
        cycling: new Icon({
        iconUrl: CycleIcon,
        iconSize: [25,25]
    }),
        bus: new Icon({
        iconUrl: BusIcon,
        iconSize: [25,25]
    })

    };

    const getIcon = (type) => icons[type] || icons["recycling"];
    
    return (
        <><Navbar />
        <div className="map-wrapper">
            <MapContainer center={[50.735, -3.535]} zoom={16}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <MarkerClusterGroup>
                    {markers.map((marker, index) => (
                        <Marker key={index} position={marker.geocode} icon={getIcon(marker.type)}>
                            <Popup>
                                {marker.popUp}
                            </Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>

            <div className="map-legend">
            <div className="legend-item">
                <img src={BinIcon} alt="Recycling" className="legend-icon" />
                <span>Recycling Bin</span>
            </div>
            <div className="legend-item">
                <img src={CycleIcon} alt="Cycle" className="legend-icon" />
                <span>Cycle Parking</span>
            </div>
            <div className="legend-item">
                <img src={BusIcon} alt="Bus" className="legend-icon" />
                <span>Bus Stop</span>
            </div>
            </div>
            </div>
        </>
    );
};

export default Map;