import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DisplayArea from "../components/DisplayArea";
import Canvas from "../components/Canvas";
import PlayingField from "../components/PlayingField";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {logDOM} from "@testing-library/react";
import Modal from "../components/Modal";
import ModalManager from "../components/ModalManager";

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
    const [displayWidth, setDisplayWidth] = useState(window.innerWidth * 0.85);
    const [displayHeight, setDisplayHight] = useState(window.innerHeight * 0.92);
    const [playAgain, setPlayAgain] = useState(false);
    const [modalOpen, setModal] = useState("false");

    const scenarioSelect = useRef();

    const sideBarElements = [
        {type: "link", href: "/", func: null, text: "Home", id: 1},
        {type: "link", href: "", func: null, text: "Play Again", id: 2},
        {type: "button", href: "", func: () => setUndo(true), text: "Undo", id: 3},
        {type: "button", href: "", func: () => setShowSolution(true), text: "Show Solution", id: 4},
        {type: "link", href: "/", func: null, text: "back", id:5}
    ]

    const measurePlayingArea = useCallback(
        (node) => {
            console.log("Measuring playing area");
            console.log("Scenario id", scenarioID);
            if(node){
                var style = getComputedStyle(node);
                console.log(style);
                setDisplayWidth(node.getBoundingClientRect().width -  parseFloat(style.paddingLeft.replace("px", "")) - parseFloat(style.paddingRight.replace("px", "") ) -2);
                setDisplayHight(node.getBoundingClientRect().height -  parseFloat(style.paddingTop.replace("px", "")) - parseFloat(style.paddingBottom.replace("px", "") ) -2);
                setResize(false);
            }
        }

       ,[scenarioID, resize]
    );

    const openModal = (e) => {
        setModal("choose-game-modal");
    }

    const closeModal = () => {
        setModal("");
    }

    React.useEffect(() => {
        window.addEventListener('resize', handleResize)
    }, [])

    function handleResize() {
        setTimeout(() => {
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
                return res.json();
            }).then(data => {
            setScnearioNames(data)
            setIsPendingScenarioNames(false);
        });
        if(!scenarioSelected || ! scenarioID){
            openModal();
        }
    }, []);


    useEffect(() => {
        if(scenarioID) {
            fetch(resourseLink).then(
                res => {
                    return res.json();
                }).then(data => {
                setData(data);
                console.log("Scenario Background: ", JSON.parse(JSON.stringify(data)).background)
                console.log(typeof JSON.parse(JSON.stringify(data)).background)
                if(JSON.parse(JSON.stringify(data)).background != null && JSON.parse(JSON.stringify(data)).background !== "" && !JSON.parse(JSON.stringify(data)).background.includes("null")){
                    console.log("INSIDE SCENARIO BACKGROUND")
                    var image = new Image();
                    image.src = JSON.parse(JSON.stringify(data)).background;
                    // setDisplayWidth(parseFloat(image.width + 5));
                    // setDisplayHight(parseFloat(image.height + 5));
                }
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

    const additionalProps = {
        handleScenarioChoice: handleScenarioChoice,
        scenarioNames: scenarioNames,
        scenarioSelect: scenarioSelect
    }



    return (
        <div className="Play Scenario">
            <Header title={'Play Game'}/>
            <Sidebar items={sideBarElements}/>
            <>  {!scenarioID &&
                <ModalManager modal={modalOpen} closeFn={closeModal} additionalProps={additionalProps}/>
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