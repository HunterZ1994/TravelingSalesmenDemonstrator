import {useEffect, useState, useRef} from "react";
import React from "react";
// import '../../resources/static/style/Canvas.css'
import "../style/Canvas.css"
import Point from "./Points";


const Canvas = ({pointToAdd, coordinates, setCoordinates, background, width, height}) => {



    function createPointList(coordinates) {
        return JSON.parse(JSON.stringify(coordinates)).solution.points;
    }

    // const [width, setWidth] = useState(1600);
    // const [height, setHeight] = useState(900);
    const createStyle = {
        width: width,
        height: height,
    }
    const [rerender, setRerender] = useState(false);
    const [renderData, setRenderData] = useState([]);
    const context = useRef();
    const canvasRef = useRef();

    useEffect(() => {
        console.log("internalWidth: ", width);
        console.log("internalHeight: ",height);
    });




    function previewImage(input) {
        // console.log(input)
        var reader = new FileReader();
        reader.onload = function (e) {
            const image = new Image();
            image.src = reader.result;
            image.onload = () => {
                // setWidth(image.width);
                // setHeight(image.height);
                // console.log("image Width: ", image.width);
                // console.log("image height: ", image.height);
                // console.log("imagesrc: " , input)
                context.current.drawImage(image, 0, 0);
            };
            // console.log("Reader loading...")

        }
        reader.readAsDataURL(input);
    }

    function handleResize () {
        setTimeout(() =>
        {
            console.log("rerender Resize")
            render()
        }, 300
        )
    }

    useEffect(() => {
            window.addEventListener("resize", handleResize);
    },
        );



    //TODO Make height and Width responsive as values.
    // Find a way to get it from the css / the current size.


    useEffect(() => {
        // console.log("useEffect triggered")
        const canvasElement = canvasRef.current;
        canvasElement.width = width;
        canvasElement.height = height;

        context.current = canvasElement.getContext('2d');
        coordinates && render()
        background && previewImage(background);
        // fetch('http://localhost:8000/points').then(res => {
        //     return res.json();
        // }).then(data => {
        //     setRenderData(data);
        // })
        setRerender(false);
    }, [])

    useEffect(() => {
        // console.log("Canvas Rerender")
        console.log("rerender");
        coordinates && render()
    },[coordinates.length]);

    function render() {
        if (coordinates) {
            coordinates.map((point) => {
                // console.log(point)
                // drawPoint((point.XPosition / parseInt(width)) * 100, (point.YPosition / parseInt(height)) * 100)
                drawPoint(point.XPosition, point.YPosition)
            })
        }
    }


    function drawPoint(x, y) {
        // console.log("Datacoordinates: ",x,"|",y)
        // console.log("RenderCoordinates", x - (window.innerWidth - width), "|" , y + (window.innerHeight - height))
        // console.log("X-PoisitionRender", window.innerWidth - width);
        // console.log("Y-PoisitionRender", window.innerHeight - height);
        const c = context.current;
        var x_position = (((x) * parseInt(width))/100);
        var y_position = (((y) * parseInt(height))/100);
        // console.log(c)
        c.beginPath();
        c.arc(x_position, y_position, 10, 0, 2 * Math.PI);
        c.stroke();
        c.fill();


    }

    function addPoint(x, y) {
        let points = coordinates;
        points.push(new Point(x, y));
        setCoordinates(points);
        // console.log(coordinates);
        render()
    }

    function calculateUniversalPosition(clientX, clientY){
      if(canvasRef.current){
          const boundingRect = canvasRef.current.getBoundingClientRect()
          return {
              x: parseFloat((clientX - boundingRect.left) * 100 / parseFloat(width)),
              y: parseFloat((clientY - boundingRect.top) * 100 / parseFloat(height))
          }
      }
      return null;
    }

    const handleClick = (e) => {

        var universalPoint = calculateUniversalPosition(e.clientX, e.clientY);
        // console.log("click on canvas");
        // console.log(e.clientX, e.clientY)
        // console.log("NativEvent", e.nativeEvent.pageX)
        addPoint(universalPoint.x,universalPoint.y);
        // console.log("afterAdd")
        // render();
    }


    return (<canvas ref={canvasRef} width={width} height={height} onClick={(e) => handleClick(e)}>
            {/*{pointToAdd && addPoint(pointToAdd.XPosition, pointToAdd.YPosition)}*/}
        </canvas>
    );
}

export default Canvas;