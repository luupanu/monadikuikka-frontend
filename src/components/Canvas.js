import React, { useEffect, useRef } from 'react';

const useCanvas = animate => {
    const canvasRef = useRef(null);

    const render = () => {
        const context = canvasRef.current.getContext('2d');

        animate(context);

        return window.requestAnimationFrame(() => {});
    };

    const resizeListener = () => {
        resizeCanvas();
        render();
    };

    const resizeCanvas = () => {
        const canvas = canvasRef.current;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    };

    // first draw
    useEffect(() => {
        resizeCanvas();
    }, []);

    // animation
    useEffect(() => {
        const id = render();

        window.addEventListener('resize', resizeListener);

        return () => {
            window.cancelAnimationFrame(id);
            window.removeEventListener('resize', resizeListener);
        };
    }, [animate]);

    return canvasRef;
};

const Canvas = ({ animate }) => {
    const canvasRef = useCanvas(animate);

    return <canvas ref={canvasRef} />;
};

export default Canvas;
