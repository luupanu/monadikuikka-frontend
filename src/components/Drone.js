import React from 'react';
import { randomWithSeed } from '../random.js';
import { distanceInMeters } from '../util.js';
import { DateTime } from 'luxon';

const addWordBreaks = email => {
    const [address, domain] = email.split('@');

    return domain ? <>{address + '@'}<wbr/>{domain}</> : email;
};

const Drone = ({ drone, timestamp }) => {
    const { id, lastSeen, closestDistance } = drone;

    const rand = randomWithSeed(drone.id);
    const randomColor = `rgba(${rand() * 255}, ${rand() * 255}, ${rand() * 255}, 0.3)`;
    const relativeDate = DateTime.fromISO(lastSeen).toRelative({ base: DateTime.fromISO(timestamp) });

    let owner = <p><span className="drone-key">owner:</span> unknown</p>;

    if (drone.pilot) {
        const { firstName, lastName, phoneNumber, email } = drone.pilot;

        owner = (
            <>
                <p><span className="drone-key">owner:</span>{firstName} {lastName}</p>
                <p><span className="drone-key">phone:</span><span><a href={`tel:${phoneNumber}`}>{phoneNumber}</a></span></p>
                <p><span className="drone-key">email:</span><span><a href={`mailto:${email}`}>{addWordBreaks(email)}</a></span></p>
            </>
        );
    }

    return (
        <div key={id} className="drone" style={{ backgroundColor: randomColor }}>
            <p><span className="drone-key">id:</span>{id}</p>
            {owner}
            <p><span className="drone-key">last seen:</span>{relativeDate === 'in 0 seconds' ? <span style={{ color: '#8b0000' }}>now</span> : relativeDate}</p>
            <p><span className="drone-key">closest distance:</span>{distanceInMeters(closestDistance)} m</p>
        </div>
    );

};

export default Drone;