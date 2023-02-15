import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DisplayArea from "../components/DisplayArea";
import Canvas from "../components/Canvas";
import PlayingField from "../components/PlayingField";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {logDOM} from "@testing-library/react";
import Modal from "../components/Modal";

const PlayScenario = ({id}) => {

    const [isPendingScenario, setIsPendingScenario] = useState(true);
    const [isPendingSenarioNames, setIsPendingScenarioNames] = useState(true);
    const [scenarioNames, setScnearioNames] = useState([])
    const [JSONdata, setData] = useState();
    const [showSolution, setShowSolution] = useState(false);
    const [undo, setUndo] = useState(false);
    const [scenarioID, setScenarioId] = useState(null);
    const [scenarioSelected, setScenarioSelected] = useState(false);
    const [resize, setResize] = useState(false);
    const [displayWidth, setDisplayWidth] = useState();
    const [displayHeight, setDisplayHight] = useState();
    const [playAgain, setPlayAgain] = useState(false);

    const scenarioSelect = useRef();

    const sideBarElements = [
        {type: "link", href: "/", func: null, text: "Home", id: 1},
        {type: "link", href: "", func: null, text: "Play Again", id: 2},
        {type: "button", href: "", func: () => setUndo(true), text: "Undo", id: 3},
        {type: "button", href: "", func: () => setShowSolution(true), text: "Show Solution", id: 4},
        {type: "link", href: "/", func: null, text: "back", id:5}
        // {type: "textinput", text: "Testinput"}
    ]

    const measurePlayingArea = useCallback(
        (node) => {
            if(node){
                var style = getComputedStyle(node);
                setDisplayWidth(node.getBoundingClientRect().width -  parseFloat(style.paddingLeft.replace("px", "")) - parseFloat(style.paddingRight.replace("px", "") ) -2);
                setDisplayHight(node.getBoundingClientRect().height -  parseFloat(style.paddingTop.replace("px", "")) - parseFloat(style.paddingBottom.replace("px", "") ) -2);
                setResize(false);
            }
        }

       ,[resize]
    );

    React.useEffect(() => {
        window.addEventListener('resize', handleResize)
    }, [])

    function handleResize() {
        setTimeout(() => {
                console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
                setResize(true);
            }, 5
        )

    }

    var resourseLink = "/api/Scenario";
    if (scenarioID) {
        resourseLink = resourseLink + "/" + scenarioID;
    }

      useEffect(() => {
        fetch("/api/scenarioNames").then(
            res => {
                console.log(res);
                return res.json();
            }).then(data => {
            setScnearioNames(data)
            setIsPendingScenarioNames(false);
        });

    }, []);


    useEffect(() => {
        if(scenarioID) {
            fetch(resourseLink).then(
                res => {
                    console.log(res)
                    return res.json();
                }).then(data => {
                setData(data);
                setIsPendingScenario(false);
            });
        }
    }, [scenarioID])

    const handleScenarioChoice = (e) => {
        e.preventDefault();
        setScenarioId(scenarioSelect.current.value)
        setScenarioSelected(true);
    }

    const handlePlayAgain = (e) => {
        e.preventDefault();

    }

    return (
        <div className="Play Scenario">
            <Header title={'Play Game'}/>
            <Sidebar items={sideBarElements}/>
            <>  {!scenarioID &&
                <DisplayArea element={<Modal open={!scenarioSelected} onClose={() => setScenarioSelected(true)}>
                    {isPendingSenarioNames && <div>Loading...</div>}
                    {!isPendingSenarioNames &&
                        <form onSubmit={(e) => handleScenarioChoice(e)}>
                            <label>Choose a Scenario</label>
                            <select name={"scenario"} id={"scenarioSelector"} ref={scenarioSelect}>
                                {scenarioNames.map((scenarioName) => {
                                        return <option value={scenarioName}>{scenarioName}</option>
                                    }
                                )}
                            </select>
                            <input type={"submit"} value={"pick!"}/>
                        </form>
                    }
                </Modal>}/>
            }
            </>
            <>
                {scenarioID && isPendingScenario && <DisplayArea element={<div>Loading ...</div>}/>}
                {scenarioID && JSONdata && <DisplayArea innerRef={measurePlayingArea}
                    element={<PlayingField width={displayWidth} height={displayHeight} scenario={JSONdata} solution={showSolution} setSolution={setShowSolution}
                                           undo={undo} setUndo={setUndo} playAgain={playAgain} setPlayAgain={setPlayAgain}/>}/>}
            </>
        </div>
    );
}

export default PlayScenario;