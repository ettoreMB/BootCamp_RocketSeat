import React, {useEffect, useState} from 'react'

import "../styles/pages/orphanage-map.css"
import api from '../services/api'
import mapIcon from '../utils/mapIcon'
import mapMarkerImg  from '../images/map_marker.svg'
import {FiPlus, FiArrowRight} from 'react-icons/fi'
import {Link} from 'react-router-dom'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';



interface Orphanage {
   id: number,
   latitude: number,
   longitude: number,
   name: string,
}


function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    useEffect(() => {
        api.get('orphanages').then(response => {
           setOrphanages(response.data)
        })
    }, [])

    console.log(orphanages)

    return ( 
    <div id="page-map">
        <aside>
            <header>
                <img src={mapMarkerImg} alt=""/>

                <h2>Escolha um orfanato no mapa</h2>
                <p>Muitas crianças estão
                esperando a sua visita :)</p>
            </header>
            <footer>
                <strong>Sao Paulo</strong>
                <span>Sao Paulo</span>
            </footer>
        </aside>

        <Map
            center={[-23.5649224,-46.5404211]}
            zoom={15}
            style={{width: '100%', height: '100%'}}
        >

            <TileLayer  url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>


        {orphanages.map(orphanage => {
            return (
                <Marker
                key={orphanage.id}
                icon={mapIcon} 
                position={[orphanage.latitude,orphanage.longitude]}
                >
                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                    <FiArrowRight size={20} color="#fff" />
                </Link>
                </Popup>
                </Marker>
            )
        }) }  
        </Map>

        <Link to="/orphanages/create" className="create-orphanage">
            <FiPlus size={32} color="#FFF"/>
        </Link>
    </div>
    )
}

export default OrphanagesMap;