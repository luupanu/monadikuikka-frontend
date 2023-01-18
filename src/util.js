import { BIRDNEST_HEIGHT, BIRDNEST_WIDTH } from './constants.js';

function distanceInMeters(distance) {
    return (distance * 0.001).toFixed(1);
}

function linearMap(value, inMin, inMax, outMin, outMax) {
    return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

function worldCoordsToCanvasCoords(ctx, positionX, positionY) {
    return {
        x: positionX / BIRDNEST_WIDTH * ctx.canvas.width,
        y: positionY / BIRDNEST_HEIGHT * ctx.canvas.height,
    };
}

export { distanceInMeters, linearMap, worldCoordsToCanvasCoords };
