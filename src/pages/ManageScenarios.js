import React, {useEffect, useRef, useState} from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DisplayArea from "../components/DisplayArea";
import Modal from "../components/Modal";
import DisplayCanvas from "../components/DisplayCanvas";

const ManageScenarios = () => {

    const inputFile = useRef(null)
    const backgroundSelector = useRef(null);
    const backgroundpreview = useRef(null);
    const newNameFiled = useRef(null);


    const sideBarElements = [
        {type: 'link', href: "/newScenario", func: null, text: "New Scenario", id: 1},
        {type: 'link', href: "#", func: () => setOpenManageModal(true) && setOpenBackgroundModal(false), text: "Edit Scenario", id: 2},
        {type: 'link', href: "#", func: null, text: 'Remove Scenario', id: 3},
        {
            type: 'link', href: "#", func: null, text: 'Manage Backgrounds', id: 4, subitems: [
                {
                    type: 'link',
                    href: "#",
                    func: (e) => openImageUpload(e),
                    text: 'Upload new Image as Background',
                    id: 5
                },
                {type: 'link', href: "#", func: () => setOpenBackgroundModal(true) && setOpenManageModal(false), text: 'Edit Background', id: 6},
            ]
        },
        {type: 'link', href: "/", func: null, text: 'Back', id: 7}
    ]

    const [backgroundNames, setBackgroundNames] = useState([]);
    const [selectedBackgroundFileName, setSelectedBackgroundFileName] = useState(null);
    const [openBackgroundModal, setOpenBackgroundModal] = useState(false);
    const [openManageModal, setOpenManageModal] = useState(false);
    const [displayBackgroundImage, setDisplayBackgroundImage] = useState(null);


    useEffect(() => {
        if (selectedBackgroundFileName) {
            const requestOptions = {
                method: 'GET',
            };
            console.log("selectedBackgroundFileName: ", selectedBackgroundFileName)
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
        console.log(e.target.value);
        setSelectedBackgroundFileName(e.target.value);
    }

    const handleBGRename = (e) => {
        console.log(newNameFiled.current);
    }

    const handDeleteBackground = (e) => {
        console.log(e.target);
    }


    return (
        <div className="home">
            <Header title={'The Traveling Salesmen'}/>
            <input type='file' id='file' name={"backgroundFile"} ref={inputFile} style={{display: 'none'}}
                   onInput={(e) => selectBackgroundFile(e)} accept={".png, .jpg, .jpeg, .gif"}/>
            <Sidebar items={sideBarElements}/>
            <>
                {openBackgroundModal && <Modal open={openBackgroundModal} onClose={() => setOpenBackgroundModal(false)}>
                <img style={{
                    width : "15vw",
                    height: "15vh",
                    objectFit: "cover",
                    objectPosition: "25% 25%"
                }} ref={backgroundpreview} alt={"backgroundpreview"}/>
                <> <input type={"button"} id={"rename"} value={"rename"} onClick={(e) => handleBGRename(e)}/>
                    <input type={"text"} id={"newName"} ref={newNameFiled}/>
                    <input type={"button"} id={"deleteBackground"} value={"delete"} onClick={(e) => handDeleteBackground(e)}/></>
                <>{openBackgroundModal && <select id={"backgroundName"} ref={backgroundSelector}
                                                  onInput={(e) => handleSelectChange(e)}>
                    {backgroundNames.map(bg => {
                        return <option value={bg}>{bg}</option>
                    })}
                </select>}</>
            </Modal> }
                {console.log("openBGModal ", openBackgroundModal)}
                {console.log("openmanagemodal ",openManageModal)}
                {openManageModal && <Modal open={openManageModal} onClose={setOpenManageModal(false)}>
                    <div>Test</div>
            </Modal>}
            </>
            <DisplayArea/>
        </div>

    );
}

export default ManageScenarios;