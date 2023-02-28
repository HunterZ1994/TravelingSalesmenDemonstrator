import React, {useEffect, useRef, useState} from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DisplayArea from "../components/DisplayArea";
import Modal from "../components/Modal";
import DisplayCanvas from "../components/DisplayCanvas";
import ModalManager from "../components/ModalManager";
import {logDOM} from "@testing-library/react";

const ManageScenarios = () => {

    const inputFile = useRef(null)
    const backgroundSelector = useRef(null);
    const backgroundpreview = useRef(null);
    const newNameFiled = useRef(null);
    const scenarioSelector = useRef(null);
    const newScenarioNameFiled = useRef(null);

    const [modalOpen, setModal] = useState("false");

    const sideBarElements = [
        {type: 'link', href: "/newScenario", func: null, text: "New Scenario", id: 1},
        {
            type: 'link', href: "#", func: null, text: "Manage Scenarios", id: 2, subitems: [
                {
                    type: 'link',
                    href: "#",
                    func: (e) => openModal(e),
                    text: "Rename Scenario",
                    id: "edit-scenario-modal"
                },
                {
                    type: 'link',
                    href: "#",
                    func: (e) => openModal(e),
                    text: 'Remove Scenario',
                    id: "remove-scenario-modal"
                },
            ]
        },
        {
            type: 'link', href: "#", func: null, text: 'Manage Backgrounds', id: 4, subitems: [
                {
                    type: 'link',
                    href: "#",
                    func: (e) => openImageUpload(e),
                    text: 'Upload new Image as Background',
                    id: 5
                },
                {
                    type: 'link',
                    href: "#",
                    func: (e) => openModal(e),
                    text: 'Edit Background',
                    id: "choose-background-modal"
                },
            ]
        },
        {type: 'link', href: "/", func: null, text: 'Back', id: 7}
    ]


    const [backgroundNames, setBackgroundNames] = useState([]);
    const [selectedBackgroundFileName, setSelectedBackgroundFileName] = useState(null);
    const [openBackgroundModal, setOpenBackgroundModal] = useState(false);
    const [openManageModal, setOpenManageModal] = useState(false);
    const [displayBackgroundImage, setDisplayBackgroundImage] = useState(null);
    const [scenarioNames, setScenarioNames] = useState([]);
    const [scenarioToRemove, setScenarioToRemove] = useState(null);

    useEffect(() => {
        if (selectedBackgroundFileName) {
            const requestOptions = {
                method: 'GET',
            };
            fetch("/api/getBackground?" + new URLSearchParams({
                "backgroundname": selectedBackgroundFileName
            }), requestOptions)
                .then(response => response.blob())
                .then(imageBlob => {
                    var filereader = new FileReader();
                    filereader.onload = () => {
                        backgroundpreview.current.src = filereader.result;
                    }
                    filereader.readAsDataURL(imageBlob)
                })
        }
    }, [openBackgroundModal, selectedBackgroundFileName])

    useEffect(() => {
        fetch("/api/getAllBackgroundNames").then(response => response.json()).then(
            names => {
                setBackgroundNames(names);
            }
        )
        fetch("/api/scenarioNames").then(response => response.json()).then(
            names => {
                setScenarioNames(names);
            }
        )
    }, [scenarioToRemove]);

    useEffect(
        () => {
            if (scenarioToRemove) {
                const requestOptions = {
                    method: 'DELETE',
                };
                fetch("api/deleteScenario?" + new URLSearchParams({
                    "scenarioID": scenarioToRemove
                }), requestOptions).then(response => {
                    response.json()
                }).then(data => {
                    console.log(data);
                })
            }
        },
        [scenarioToRemove])


    const openModal = (e) => {
        e.preventDefault();
        const {
            target: {
                id
            }
        } = e;
        if (id) setModal(id)
    }

    const closeModal = () => {
        setModal("");
    }

    const openImageUpload = (e) => {
        e.preventDefault();
        inputFile.current.click();
    }

    const selectBackgroundFile = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("backgroundFile", e.target.files[0]);
        const requestOptions = {
            method: 'POST',
            body: formData
        };
        fetch("/api/uploadBackground", requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }


    const handleSelectChange = (e) => {
        e.preventDefault();
        setSelectedBackgroundFileName(e.target.value);
    }

    const handleBGRename = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("backgroundName", backgroundSelector.current.value);
        formData.append("newName", newNameFiled.current.value)
        const requestOptions = {
            method: 'POST',
            body: formData
        };
        fetch("api/renameBackground", requestOptions)
            .then(response => response.status)
            .then(data => console.log(data));
    }

    const handDeleteBackground = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("backgroundName", backgroundSelector.current.value);
        const requestOptions = {
            method: 'DELETE',
            body: formData
        };
        fetch("api/deleteBackground", requestOptions)
            .then(res => res.status).then(data => console.log(data));
    }

    const handleScenarioRemove = (e) => {
        setScenarioToRemove(scenarioSelector.current.value);
    }

    const handleScenarioRename = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("ScenarioName", scenarioSelector.current.value);
        formData.append("newName", newScenarioNameFiled.current.value)
        const requestOptions = {
            method: 'POST',
            body: formData
        };
        fetch("api/renameScenario", requestOptions)
            .then(response => response.status)
            .then(data => console.log(data));
    }


    const additionalProps = {
        backgroundpreview: backgroundpreview,
        newNameFiled: newNameFiled,
        backgroundSelector: backgroundSelector,
        handDeleteBackground: handDeleteBackground,
        handleBGRename: handleBGRename,
        handleSelectChange: handleSelectChange,
        backgroundNames: backgroundNames,
        handleScenarioRemove: handleScenarioRemove,
        scenarioSelector: scenarioSelector,
        scenarioNames: scenarioNames,
        newScenarioNameFiled: newScenarioNameFiled,
        handleScenarioRename: handleScenarioRename
    }


    return (
        <div className="home">
            <Header title={'Manage Scenarios'}/>
            <input type='file' id='file' name={"backgroundFile"} ref={inputFile} style={{display: 'none'}}
                   onInput={(e) => selectBackgroundFile(e)} accept={".png, .jpg, .jpeg, .gif"}/>
            <Sidebar items={sideBarElements}/>
            <DisplayArea/>
            <>
                <ModalManager closeFn={closeModal} modal={modalOpen} additionalProps={additionalProps}/>
            </>
        </div>
    )
        ;
}

export default ManageScenarios;