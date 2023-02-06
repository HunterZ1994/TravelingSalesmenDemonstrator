import React, {useRef, useEffect, useState} from "react";
import Point from "./Point";
import DisplayCanvas from "./DisplayCanvas";
import Modal from "./Modal";
import {Button, Label} from "reactstrap";
import "../style/Playingfield.css";

const PlayingField = ({scenario, width, height, solution, setSolution, undo, setUndo, playAgain, setPlayAgain}) => {

    const [currentPoint, setCurrentPoint] = useState();
    const [scenarioPoints, setScenarioPoints] = useState([]);
    const [scenarioEdges, setScenarioEdges] = useState([]);
    const [edges, setEdges] = useState([]);
    const [solutionLength, setSolutionLength] = useState();
    const [playerLength, setPlayerLength] = useState();
    const [pointsSelected, setPointsSelected] = useState([]);
    const [alert, setAlert] = useState(false)
    const [testArray, setTestarray] = useState([]);
    const [pathFinished, setPathFinished] = useState(false);
    const [test, setTest] = useState(0);

    useEffect(() => {
        var edges = JSON.parse(JSON.stringify(scenario)).solution.edges;
        setScenarioEdges(edges)
        var solutionLength = JSON.parse(JSON.stringify(scenario)).solution.solutionLength;
        setSolutionLength(solutionLength);
    }, [])

    useEffect(() => {
        setScenarioPoints(createPointList(scenario, currentPoint))
    }, [scenario, currentPoint]);

    useEffect(() => {
        // console.log("scenarioPointsUpdated");
    }, [scenarioPoints]);


    useEffect(() => {
        // console.log("edgesUpdated");
    }, [edges.length]);

    useEffect(() => {
        // console.log(playAgain)
        if (playAgain) {
            setEdges([]);
        }
        setPlayAgain(false);
        // console.log(edges)
    }, [playAgain]);


    useEffect(() => {
        if (undo) {
            // setCurrentPoint(pointsSelected.pop())
            const item = edges;
            const prevoiusPoints = pointsSelected;
            item.pop();
            setCurrentPoint(prevoiusPoints.pop())
            setEdges(item);
            setScenarioPoints(createPointList(scenario, currentPoint));
            // console.log(edges);
            // console.log("undone");
            // // console.log(pointsSelected.pop())
            // console.log(pointsSelected)
            // console.log(currentPoint)
        }
        setUndo(false)
    }, [undo])

    useEffect(() => {
        console.log("handling Resize");
        console.log("edges", edges)
        console.log("points Selected", pointsSelected)
        console.log("scenarioPoints pre", scenarioPoints)
        var tempSelected = pointsSelected;
        var last = null;
        if(pointsSelected.at(-1)){
            last = JSON.parse(JSON.stringify(pointsSelected.at(-1)));
            last.selected = true;
            tempSelected.pop();
            tempSelected.push(last);
        }
        console.log("last", last);
        console.log("tempSElected", tempSelected);
        var indices = pointsSelected.map((point) => {
            return findPointIndex(point);
        })
        // indices.push(findPointIndex(currentPoint));
        // indices.pop();
        console.log("indices", indices);
        setScenarioPoints(createPointList(scenario));

        console.log(scenarioPoints);
      },[width, height]
    )

    function recalculateEdges (indicies){
        let tempStart = pointsSelected.at(indicies[0])
        if(indicies.length > 1){
            indicies.forEach(

            )
        }
    }

    function recalculateSolutionEdges (){

    }


    function contains(pointsArray, point) {
        var returnValue = false
        pointsArray.map((element) => {
            // console.log("Equals? ", JSON.stringify(element), JSON.stringify(point))
            // console.log(JSON.stringify(element) === JSON.stringify(point))

            if (JSON.stringify(element) === JSON.stringify(point)) {
                returnValue = true;
            }
        })
        return returnValue;
    }

    function getScenarioPointsRelative(pointsList){
        var points = JSON.parse(JSON.stringify(pointsList));
        points.map((point) => {
            point.x_coordinate = parseFloat(parseFloat(parseFloat(point.x_coordinate / 1600) * width).toFixed(2));
            point.y_coordinate = parseFloat(parseFloat(parseFloat(point.y_coordinate / 900 )* height).toFixed(2));
            point.selected = false;
        })
        return points
    }

    function createPointList(scenario, selectedPoint = null) {
        var points = getScenarioPointsRelative(JSON.parse(JSON.stringify(scenario)).solution.points);
        points.map((point) => {
            point.selected = false;
        })
        // console.log(selectedPoint);
        // console.log(points);
        if (selectedPoint != null) {
            points[points.findIndex((element) => {
                return JSON.stringify(element) === JSON.stringify(selectedPoint)
            })].selected = true;
        }
        return points
    }

    const findPointIndex = (point) => {
        return scenarioPoints.findIndex((element) => {
            return JSON.stringify(element) === JSON.stringify(point)
        });
    }

    const addToSelectedPoints = (point) => {
        var temp = pointsSelected;
        temp.push(point);
        setPointsSelected(temp);
    }

    const finishPath = (endpoint) => {
        if (edges.length === scenarioEdges.length - 1) {
            return JSON.stringify(endpoint) === JSON.stringify(pointsSelected[0]);
        }
        return false
    }


    /**
     *
     * @returns The complete distance traveled along all currently cereated Edges.
     */
    const calculatePathLength = () => {
        //Set the default length of the graph to 0.0
        var RoundCourseLegth = 0.0;

        // Iterate over all the currently created Edges.
        edges.map((edge) => {
            // Get the x- and y- coordinates of the start- and end Point of the edge
            var JSONEdge = JSON.parse(JSON.stringify(edge))
            var startPoint = JSON.parse(JSON.stringify(JSONEdge.start));
            var endPoint = JSON.parse(JSON.stringify(JSONEdge.end));
            // Calculate the difference between the x-coordinate of the start- and EndPoint
            var x_distance = parseFloat(startPoint.x_coordinate) - parseFloat(endPoint.x_coordinate);
            // Calculate the difference between the y-coordinate of the start- and EndPoint
            var y_distance = parseFloat(startPoint.x_coordinate) - parseFloat(endPoint.x_coordinate)
            // Calculate the Distance between the two points using the default formula
            var distance = parseFloat(Math.sqrt(Math.pow(x_distance, 2) + Math.pow(y_distance, 2)));
            // Add the distance between the two Points to the overall distance for the Graph.
            RoundCourseLegth += distance;
        })

        // Return the full length of the path for all currently selected edges.
        return RoundCourseLegth;
    }

    /**
     * Event handler passed to the individual inputs to handle their onClick Events
     * @param e Event returned by onClick event
     */
    const handleClick = (e) => {
        // prevents reload of page onClick.
        e.preventDefault();

        // A temporary object consisting of the inputs x and y coordinates. These Coordinates also determine the  inputs position inside the canvas.
        var temp = {
            "x_coordinate": parseFloat(e.target.style.left.replace("px", "")),
            "y_coordinate": parseFloat(e.target.style.top.replace("px", "")),
            "selected": false
        }
        // Setting the currently selected Point to be equal to the
        setCurrentPoint(temp);
        if (contains(pointsSelected, temp) && !finishPath(temp)) {
            setAlert(true);
        } else {
            var setFinishAfter = false;
            if (finishPath(temp)) {
                setFinishAfter = true;
            }
            addToSelectedPoints(temp);
            if (pointsSelected.length > 1) {
                var tempEdges = edges;
                tempEdges.push(
                    {
                        "start": pointsSelected[pointsSelected.length - 2],
                        "end": temp
                    }
                )
                setEdges(tempEdges);
                setPlayerLength(calculatePathLength());
            }
            if (setFinishAfter) {
                setPathFinished(true);
            }
        }
    }

    const handleSolutionModal = () => {
        setSolution(true);
        setPathFinished(false);
    }

    return (
        <>
            {scenarioPoints && <div className="wrapper" style={{height: "100%", with: "100%", borderRadius: "10px"}}>
                {solution && <DisplayCanvas width={width} height={height} edges={edges}
                                            solutionEdges={scenarioEdges}></DisplayCanvas>}
                {!solution && <DisplayCanvas width={width} height={height} edges={edges}></DisplayCanvas>}
                {alert && console.log("alert")}
                {<Modal open={pathFinished} onClose={() => setPathFinished(false)}>
                    <><Label>Best Solution: </Label><Label>{solutionLength}</Label></>
                    <><Label>Your Solution: </Label><label>{playerLength}</label></>
                    <Button className={"ShowSolution"} name={"solutionModal"} value={"ShowSolution"}
                            onClick={() => handleSolutionModal()}>Show Solution</Button>
                </Modal>}
                <div className="layout">
                    <form style={{width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0)"}}>
                        {scenarioPoints.map((point) => {
                            return <Point x_coordinate={point.x_coordinate} y_coordinate={parseFloat(point.y_coordinate)}
                                          selected={point.selected} click={(e) => handleClick(e)}/>
                        })}
                    </form>
                </div>
            </div>}

        </>
    )

}

export default PlayingField