import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import DroneMap from './components/DroneMap.js';
import DroneList from './components/DroneList.js';
import Loading from './components/Loading.js';
import './style.css';

const socket = io(process.env.REACT_APP_WEBSOCKET_ADDRESS);

function App() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [droneData, setDroneData] = useState([]);
    const [timestamp, setTimestamp] = useState(null);

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);

            console.log('Websocket connection online.');
        });

        socket.on('disconnect', () => {
            setIsConnected(false);

            console.log('Websocket connection offline.');
        });

        socket.on('update', (timestamp, data) => {
            setTimestamp(timestamp);
            setDroneData(data);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('update');
        };
    }, []);

    if (droneData.length === 0) {
        return <Loading />;
    }

    return (
        <div id="app">
            <DroneList drones={droneData.filter(drone => drone.trespassed)} timestamp={timestamp}/>
            <DroneMap droneData={droneData} isConnected={isConnected} timestamp={timestamp} />
        </div>
    );
}

export default App;
