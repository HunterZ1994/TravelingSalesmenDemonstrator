import React, {useEffect, useState} from "react";
import Point from "./Point";
import DisplayCanvas from "./DisplayCanvas";
import "../style/Playingfield.css";
import ModalManager from "./ModalManager";

const PlayingField = ({scenario, width, height, solution, setSolution, undo, setUndo, playAgain, setPlayAgain}) => {

    const [currentPoint, setCurrentPoint] = useState();
    const [scenarioPoints, setScenarioPoints] = useState([]);
    const [scenarioEdges, setScenarioEdges] = useState([]);
    const [edges, setEdges] = useState([]);
    const [solutionLength, setSolutionLength] = useState();
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [playerLength, setPlayerLength] = useState();
    const [pointsSelected, setPointsSelected] = useState([]);
    const [alert, setAlert] = useState(false)
    const [modalOpen, setModal] = useState("false");
    const [testArray, setTestarray] = useState([]);
    const [pathFinished, setPathFinished] = useState(false);
    const [test, setTest] = useState(0);

    useEffect(() => {
        var edges = JSON.parse(JSON.stringify(scenario)).solution.edges;
        console.log("Edges from server", JSON.parse(JSON.stringify(scenario)).solution.edges);
        setScenarioEdges(getSolutionEdgesRlative(JSON.parse(JSON.stringify(scenario)).solution.points, JSON.parse(JSON.stringify(scenario)).solution.edges));
        // setScenarioEdges(JSON.parse(JSON.stringify(scenario)).solution.edges);
        var bg = JSON.parse(JSON.stringify(scenario)).background;
        setBackgroundImage(bg);
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
            const item = edges;
            const prevoiusPoints = pointsSelected;
            item.pop();
            setCurrentPoint(prevoiusPoints.pop())
            setEdges(item);
            setScenarioPoints(createPointList(scenario, currentPoint));
        }
        setUndo(false)
    }, [undo])

    useEffect(() => {
            var tempSelected = pointsSelected;
            var last = null;
            if (pointsSelected.at(-1)) {
                last = JSON.parse(JSON.stringify(pointsSelected.at(-1)));
                last.selected = true;
                tempSelected.pop();
                tempSelected.push(last);
            }
            var indices = pointsSelected.map((point) => {
                return findPointIndex(point);
            })
        setScenarioPoints(createPointList(scenario));
        }, [width, height]
    )

    const openModal = (modal) => {
        if(modal === "victory") {
            setModal("victory-modal");
        }else if(modal === alert){
            setModal("alert-modal");
        }
    }

    const closeModal = () => {
        setModal("");
    }


    function contains(pointsArray, point) {
        var returnValue = false
        pointsArray.map((element) => {
            if (JSON.stringify(element) === JSON.stringify(point)) {
                returnValue = true;
            }
        })
        return returnValue;
    }

    function getScenarioPointsRelative(pointsList) {
        var points = JSON.parse(JSON.stringify(pointsList));
        var percentilepoints = true;
        var widthHeightRatio;
        if (width > height) {
            widthHeightRatio = (width / height) * 100;
        } else {
            widthHeightRatio = (height / width) * 100;
        }
        points.map((point) => {
            if (point.x_coordinate > widthHeightRatio || point.y_coordinate > widthHeightRatio) {
                percentilepoints = false;
            }
        })
        if (percentilepoints) {
            points.map((point) => {
                point.x_coordinate = parseFloat(parseFloat((parseFloat(point.x_coordinate) * width) / 100).toFixed(2));
                point.y_coordinate = parseFloat(parseFloat((parseFloat(point.y_coordinate) * height) / 100).toFixed(2));
                point.selected = false;
            })
        } else {
            points.map((point) => {
                point.x_coordinate = parseFloat(parseFloat(parseFloat(point.x_coordinate / 1600) * width).toFixed(2));
                point.y_coordinate = parseFloat(parseFloat(parseFloat(point.y_coordinate / 900) * height).toFixed(2));
                point.selected = false;
            })
        }
        return points
    }

    function getSolutionEdgesRlative(pointsList, scenarioEdgeList) {
        var solutionEdges = [];
        var percentilepoints = true;
        var widthHeightRatio;
        console.log("edgeRelWidth", width);
        console.log("WedgeRelHeight", height)
        if (width > height) {
            widthHeightRatio = (width / height) * 100;
        } else {
            widthHeightRatio = (height / width) * 100;
        }
        pointsList.map((point) => {
            if (point.x_coordinate > widthHeightRatio || point.y_coordinate > widthHeightRatio) {
                percentilepoints = false;
            }
        })
        if (!percentilepoints) {
            solutionEdges=(scenarioEdgeList.map((edge) => {

                return {
                    "start": {
                        "x_coordinate": parseFloat((parseFloat(JSON.parse(JSON.stringify(edge)).start.x_coordinate) / 1600) * width).toFixed(2),
                        "y_coordinate": parseFloat((parseFloat(JSON.parse(JSON.stringify(edge)).start.y_coordinate) / 900) * height).toFixed(2),
                    },
                    "end": {
                        "x_coordinate": parseFloat((parseFloat(JSON.parse(JSON.stringify(edge)).end.x_coordinate) / 1600) * width).toFixed(2),
                        "y_coordinate": parseFloat((parseFloat(JSON.parse(JSON.stringify(edge)).end.y_coordinate) / 900) * height).toFixed(2),
                    }
                };
            }));
        } else {
            solutionEdges=(scenarioEdgeList.map((edge) => {
                return {
                    "start": {
                        "x_coordinate": parseFloat((parseFloat(JSON.parse(JSON.stringify(edge)).start.x_coordinate) * width) / 100).toFixed(2),
                        "y_coordinate": parseFloat((parseFloat(JSON.parse(JSON.stringify(edge)).start.y_coordinate) * height) / 100).toFixed(2),
                    },
                    "end": {
                        "x_coordinate": parseFloat((parseFloat(JSON.parse(JSON.stringify(edge)).end.x_coordinate) * width) / 100).toFixed(2),
                        "y_coordinate": parseFloat((parseFloat(JSON.parse(JSON.stringify(edge)).end.y_coordinate) * height) / 100).toFixed(2),
                    }
                };
            }));
        }
        // TODO set to solutionEdges
        setSolutionLength(recalculateLength(solutionEdges));
        return solutionEdges;

    }

    function recalculateLength(edgelist) {
        var lengthArray = [];
        var length = 0.0
        lengthArray = edgelist.map((edge) => {
           return  (Math.sqrt(Math.pow(JSON.parse(JSON.stringify(edge)).end.x_coordinate - JSON.parse(JSON.stringify(edge)).start.x_coordinate, 2)
               +  Math.pow(JSON.parse(JSON.stringify(edge)).end.y_coordinate- JSON.parse(JSON.stringify(edge)).start.y_coordinate, 2)));
        })
        lengthArray.forEach( (element) => {
                length += parseFloat(element);
            }
        )
        return length;
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
                console.log("element", JSON.stringify(element));
                console.log("selectedPoint", JSON.stringify(selectedPoint))
                // element.x_coordinate === selectedPoint.x_value;
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
            openModal("alert");
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
                openModal("victory");
            }
        }
    }

    const handleSolutionModal = () => {
        setSolution(true);
        setPathFinished(false);
    }

    const additionalProps = {
        handleSolutionModal: handleSolutionModal,
        solutionLength: parseFloat(solutionLength).toFixed(2),
        playerLength: parseFloat(playerLength).toFixed(2)
    }

    return (
        <>
            {scenarioPoints && <div className="wrapper" style={{height: "100%", with: "100%", borderRadius: "10px"}}>
                {solution && <DisplayCanvas width={width} height={height} edges={edges}
                                            solutionEdges={scenarioEdges}
                                            backgroundImage={backgroundImage}></DisplayCanvas>}
                {!solution && <DisplayCanvas width={width} height={height} edges={edges}
                                             backgroundImage={backgroundImage}></DisplayCanvas>}
                <ModalManager modal={modalOpen} closeFn={closeModal} additionalProps={additionalProps}/>
                <div className="layout">
                    <form style={{width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0)"}}>
                        {scenarioPoints.map((point) => {
                            return <Point x_coordinate={point.x_coordinate}
                                          y_coordinate={parseFloat(point.y_coordinate)}
                                          selected={point.selected} click={(e) => handleClick(e)}/>
                        })}
                    </form>
                </div>
            </div>}

        </>
    )

}

export default PlayingField