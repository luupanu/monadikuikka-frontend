import React from 'react';
import Canvas from './Canvas.js';
import { randomWithSeed } from '../random.js';
import {
    linearMap,
    worldCoordsToCanvasCoords
} from '../util.js';

const DroneMap = ({ droneData, isConnected, timestamp }) => {
    const drawBirdBackground = ctx => {
        ctx.beginPath();
        ctx.setLineDash([10]);
        ctx.fillStyle = 'rgba(42, 138, 222, 0.1)';
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.arc(
            ctx.canvas.width * 0.5,
            ctx.canvas.height * 0.5,
            ctx.canvas.width * 0.2,
            0,
            2 * Math.PI,
        );
        ctx.stroke();
        ctx.fill();
        ctx.setLineDash([]);
    };

    const drawDisconnected = ctx => {
        const disconnectText = 'disconnected';

        ctx.fillStyle = 'red';
        ctx.font = '48px Arial';

        const metrics = ctx.measureText(disconnectText);

        ctx.fillText(disconnectText, ctx.canvas.width * 0.5 - metrics.width * 0.5, ctx.canvas.height - 50);
        ctx.filter = 'blur(4px)';
    };

    const drawDrone = (ctx, drone) => {
        const latestPos = drone.pos[0];
        const { x, y } = worldCoordsToCanvasCoords(ctx, latestPos.positionX, latestPos.positionY);

        const DRONE_SIZE = ctx.canvas.width / 50;

        ctx.lineWidth = ctx.canvas.width / 200;
        ctx.strokeStyle = drone.trespassed ? 'red' : 'forestgreen';

        // draw an x-shaped cross to represent drone
        ctx.beginPath();
        ctx.moveTo(x - DRONE_SIZE, y - DRONE_SIZE);
        ctx.lineTo(x + DRONE_SIZE, y + DRONE_SIZE);
        ctx.moveTo(x + DRONE_SIZE, y - DRONE_SIZE);
        ctx.lineTo(x - DRONE_SIZE, y + DRONE_SIZE);
        ctx.stroke();
    };

    const drawDroneId = (ctx, drone) => {
        const latestPos = drone.pos[0];
        const { x, y } = worldCoordsToCanvasCoords(ctx, latestPos.positionX, latestPos.positionY);

        ctx.font = '14px Arial';

        const droneSize = ctx.canvas.width / 50;
        const padding = 10;
        const metrics = ctx.measureText(drone.id);

        // draw background rectangle for drone id
        ctx.fillStyle = 'white';
        const yMult = linearMap(ctx.canvas.width, 0, 2560, 3.5, 1.15);

        ctx.fillRect(
            x - droneSize * 2 - padding * 0.5,
            y - droneSize * yMult - padding * 0.5,
            metrics.width + padding,
            metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent + padding,
        );

        // draw drone id text
        ctx.fillStyle = 'black';
        ctx.fillText(drone.id, x - droneSize * 2, y - droneSize * 2);
    };

    const drawFlightPath = (ctx, drone) => {
        if (drone.pos) {
            ctx.lineWidth = ctx.canvas.width / 200;

            const rand = randomWithSeed(drone.id);
            const randomColor = `rgba(${rand() * 255}, ${rand() * 255}, ${rand() * 255}, 0.4)`;

            for (let i = 0; i < drone.pos.length - 1; i++) {
                const pos = drone.pos[i];
                const nextPos = drone.pos[i+1];
                const { x, y } = worldCoordsToCanvasCoords(ctx, pos.positionX, pos.positionY);
                const { x: nextX, y: nextY } = worldCoordsToCanvasCoords(ctx, nextPos.positionX, nextPos.positionY);

                ctx.strokeStyle = randomColor;
                ctx.fillStyle = randomColor;

                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(nextX, nextY);
                ctx.stroke();
            }
        }
    };

    const animate = ctx => {
        const currentDrones = droneData.filter(drone => drone.lastSeen === timestamp);

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.filter = 'none';

        if (!isConnected) {
            drawDisconnected(ctx);
        }

        drawBirdBackground(ctx);

        // multiple for-loops are in order to make sure that graphics-wise
        // all flight paths are below all drones are below all drone ids
        for (const drone of currentDrones) {
            drawFlightPath(ctx, drone);
        }

        for (const drone of currentDrones) {
            drawDrone(ctx, drone);
        }

        for (const drone of currentDrones) {
            drawDroneId(ctx, drone);
        }
    };

    return (
        <div className="birdmap">
            <h2 className="title">Situation at birdnest {new Date(timestamp).toLocaleString()}</h2>
            <Canvas animate={animate} />
        </div>
    );
};

export default DroneMap;
