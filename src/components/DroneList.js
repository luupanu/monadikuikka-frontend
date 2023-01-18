import React from 'react';
import Drone from './Drone.js';

const DroneList = ({ drones, timestamp }) => {
    const dronesByClosestDistance = [...drones].sort((a, b) => a.closestDistance - b.closestDistance);
    const dronesByFirstTrespassed = [...dronesByClosestDistance].sort((a, b) => Date.parse(b.firstTrespassed) - Date.parse(a.firstTrespassed));
    const dronesByLastSeen = [...dronesByFirstTrespassed].sort((a, b) => Date.parse(b.lastSeen) - Date.parse(a.lastSeen));
    const dronesSeenNow = dronesByLastSeen.filter(drone => drone.lastSeen === timestamp);
    const dronesSeenBefore = dronesByLastSeen.filter(drone => drone.lastSeen !== timestamp);

    let trespassers = <p>No trespassers.</p>;

    if (dronesSeenNow.length > 0 || dronesSeenBefore.length > 0) {
        trespassers = <>
            {dronesSeenNow.length > 0 && <h3>now</h3>}
            <div className="drones">
                {dronesSeenNow.map(drone => <Drone drone={drone} key={drone.id} timestamp={timestamp} />)}
            </div>
            {dronesSeenBefore.length > 0 && <h3>past 10 minutes</h3>}
            <div className="drones">
                {dronesSeenBefore.map(drone => <Drone drone={drone} key={drone.id} timestamp={timestamp} />)}
            </div>
        </>;
    }

    return (
        <div className="dronelist">
            <h2>Trespassers</h2>
            {trespassers}
        </div>
    );
};

export default DroneList;
