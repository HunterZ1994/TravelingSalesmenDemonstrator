import React, {useEffect, useRef, useState} from "react";
import "../style/Canvas.css"

const DisplayCanvas = ({edges, solutionEdges, backgroundImage, width, height, children}) => {

    const canvasRef = useRef();
    const context = useRef();
    const [displayEdges, setDisplayEdges] = useState([]);


    useEffect(() => {
        const canvasElement = canvasRef.current;
        context.current = canvasElement.getContext('2d');
        setDisplayEdges(edges)
        const c = context.current;
        c.clearRect(0, 0, canvasElement.width, canvasElement.height);
        if (backgroundImage) {
            var image = new Image();
            image.src = backgroundImage;
            c.drawImage(image, 0,0, image.width, image.height);
        }
        displayEdges.map((edge) => {
            var JSONEdge = JSON.parse(JSON.stringify(edge));
            c.beginPath();
            c.lineWidth = 3;
            c.moveTo(parseFloat(parseFloat(JSONEdge.start.x_coordinate +5).toFixed(2)), parseFloat(parseFloat(JSONEdge.start.y_coordinate +5).toFixed(2)));
            c.lineTo(parseFloat(parseFloat(JSONEdge.end.x_coordinate +5).toFixed(2)), parseFloat(parseFloat(JSONEdge.end.y_coordinate +5).toFixed(2)));
            c.strokeStyle = "black";
            c.stroke();
        })
        if (solutionEdges) {
            solutionEdges.map((edge) => {
                const c = context.current;
                var JSONEdge = JSON.parse(JSON.stringify(edge));
                c.beginPath();
                c.lineWidth = 3;
                c.moveTo(parseFloat(parseFloat(JSONEdge.start.x_coordinate).toFixed(2)+5), parseFloat(parseFloat(JSONEdge.start.y_coordinate).toFixed(2)+5));
                c.lineTo(parseFloat(parseFloat(JSONEdge.end.x_coordinate).toFixed(2)+5), parseFloat(parseFloat(JSONEdge.end.y_coordinate).toFixed(2)+5));
                c.strokeStyle = "red";
                c.stroke();
            })
        }
        // displayEdges && render();

    }, [displayEdges.length, backgroundImage])

    // const render = () => {
    //     const ctx = context.current;
    //     ctx.fillStyle = "green";
    //     ctx.fillRect(0, 0, 10, 10);
    //     ctx.fill();
    // }


    return (<canvas ref={canvasRef} width={width} height={height}>{children}</canvas>)

}

export default DisplayCanvas;