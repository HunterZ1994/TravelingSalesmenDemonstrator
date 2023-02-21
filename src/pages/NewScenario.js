import React, {useState, useRef, useEffect, useCallback} from "react";
import Header from "../components/Header";
// import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import DisplayArea from "../components/DisplayArea";
import Canvas from "../components/Canvas";
import Point from "../components/Points";
import Modal from "../components/Modal";
import ModalManager from "../components/ModalManager";
import {type} from "@testing-library/user-event/dist/type";

const NewScenario = () => {

    const [canvasWidth, setCanvasWidth] = useState(1600);
    const [canvasHeight, setCanvasHeight] = useState(900);
    const [resized, setResized] = useState(false);

    const [modalOpen, setModal] = useState("false");


    let temp = null;

    const measurePlayingArea = useCallback(
        (node) => {
            if (node) {
                console.log(node)
                var style = getComputedStyle(node);
                setCanvasWidth(node.getBoundingClientRect().width - parseFloat(style.paddingLeft.replace("px", "")) - parseFloat(style.paddingRight.replace("px", "")) - 2);
                setCanvasHeight(node.getBoundingClientRect().height - parseFloat(style.paddingTop.replace("px", "")) - parseFloat(style.paddingBottom.replace("px", "")) - 2);
                setResized(false);
            }
        }, [resized]
    )

    const openModal = (e) => {
        e.preventDefault();
        console.log("OPEN MODAL")
        const {
            target: {
                id
            }
        } = e;
        console.log(e.target);
        console.log(id)
        if (id) setModal(id)
        console.log("useState", modalOpen);
    }

    const closeModal = () => {
        setModal("");
    }

    React.useEffect(() => {
        window.addEventListener('resize', handleResize)
    }, [])

    function handleResize() {
        setTimeout(() => {
                console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
                setResized(true);
            }, 300
        )
        // manageCanvasSize()
    }

    const backgroundpreview = useRef(null);

    const [isOpen, setIsOpen] = useState(false);
    const [coordinates, setCoordinates] = useState([]);
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [background, setBackground] = useState();
    const [image, setSetImage] = useState();
    const [file, setFile] = useState();
    const [preview, setPreviw] = useState();
    const [backgroundNames, setBackgroundNames] = useState([]);
    const [selectedBackgroundFileName, setSelectedBackgroundFileName] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        var body = {
            "name": name,
            "id": id,
            "solution": {
                "points": coordinates
            },
            "background": background
        }
        console.log(body);
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)
        };
        fetch("/api/newScenario", requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }

    useEffect(() => {
        fetch("/api/getAllBackgroundNames").then(response => response.json()).then(
            names => {
                setBackgroundNames(names);
            }
        )
    }, []);

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
                        console.log(typeof filereader.result)
                    }
                    filereader.readAsDataURL(imageBlob)
                })
        }
    }, [selectedBackgroundFileName])


    const sideBarElements = [
        {
            type: "Form",
            href: "",
            handleSubmit: (e) => handleSubmit(e),
            coordinates: coordinates,
            setCoordinates: () => setCoordinates,
            setName: setName,
            setBackground: setBackground,
            text: ""
        },
        {type: "link", href: "", func: (e) => openModal(e), text: "Select Background", id: "select-background-modal"},
        {type: "link", href: "/", func: null, text: "Home"}
    ]

    const handleFile = (e) => {
        e.preventDefault();
        setIsOpen(false);
        setBackground(file)
        var filereader = new FileReader();
        filereader.onload = () => {
            var image = new Image();
            image.src = filereader.result;
            image.onload = () => {
                console.log("image width: ", file.width);
                console.log("image height", file.height);
            }
        }
        filereader.readAsDataURL(file)
    }



    function previewImage(input) {
        setFile(input);
        var reader = new FileReader();
        reader.onload = function (e) {
            setPreviw(reader.result);
        }
        reader.readAsDataURL(input);
    }

    const handleSelectChange = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setSelectedBackgroundFileName(e.target.value);
    }

    const handleSelectBackground = (e) => {
        e.preventDefault();
        // console.log("New Modal bg preview", backgroundpreview.current.src);
        setBackground(backgroundpreview.current.src)
    }

    const additionalProps = {
        preview: preview,
        previewImage: previewImage,
        handleFile: handleFile,
        backgroundNames: backgroundNames,
        selectedBackgroundFileName: selectedBackgroundFileName,
        backgroundpreview: backgroundpreview,
        handleSelectChange: handleSelectChange,
        selectBackground: handleSelectBackground,
    }


    return (
        <div className="new Scenario">
            <Header title={'Create New Scenario'}/>
            <Sidebar items={sideBarElements}/>
            {!background && <DisplayArea innerRef={measurePlayingArea}
                                         element={<Canvas pointToAdd={temp} width={canvasWidth} height={canvasHeight}
                                                          coordinates={coordinates}
                                                          setCoordinates={setCoordinates}/>}/>}
            {background && <DisplayArea innerRef={measurePlayingArea}
                                        element={<Canvas pointToAdd={temp} width={canvasWidth} height={canvasHeight}
                                                         coordinates={coordinates} setCoordinates={setCoordinates}
                                                         background={background}/>}/>}
            <ModalManager modal={modalOpen} closeFn={closeModal} additionalProps={additionalProps}/>
        </div>


    );
}

export default NewScenario;