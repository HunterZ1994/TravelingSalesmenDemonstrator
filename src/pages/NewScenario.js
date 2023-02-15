import React, {useState, useRef, useEffect, useCallback} from "react";
import Header from "../components/Header";
// import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import DisplayArea from "../components/DisplayArea";
import Canvas from "../components/Canvas";
import Point from "../components/Points";
import Modal from "../components/Modal";
import ModalManager from "../components/ModalManager";

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

    // function manageCanvasSize(){
    //     const measurePlayingArea = useCallback(
    //         (node) => {
    //             if(node) {
    //                 console.log("callback", node.getBoundingClientRect());
    //                 setCanvasHeight(node.getBoundingClientRect().height-15);
    //                 setCanvasWidth(node.getBoundingClientRect().width-15);
    //             }
    //         },
    //         [],
    //     );
    // }


    // const handleAdd = (X_CoordinateRef, Y_CoordinateRef) => {
    //     // console.log(Document.getElementById("X-Coordinate"))
    //     // console.log(Document.getElementById("Y-Coordinate"))
    //     // console.log(document.getElementById())
    //     console.log("TEST")
    //     console.log(X_CoordinateRef.value)
    //     console.log(Y_CoordinateRef.value)
    //     temp = new Point(X_CoordinateRef.value, Y_CoordinateRef.value)
    //
    // }

    const [isOpen, setIsOpen] = useState(false);
    const [coordinates, setCoordinates] = useState([]);
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [background, setBackground] = useState();
    const [image, setSetImage] = useState();
    const [file, setFile] = useState();
    const [preview, setPreviw] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        var body = {
            "name": name,
            "id": id,
            "solution": {
                "points": coordinates
            },
            "background": preview
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

    const sideBarElements = [
        // {type: "textInput", href: "/", func: null, text: "Name Scenario", id: 1},
        // {type: "coordianteInput", href: "/", func: null, text: "X / Y", id: 2},
        // {type: 'button', href: "/", func: null, text: "Undo", id: 3},
        // {
        //     type: 'link', href: "#", func: null, text: 'Manage Backgrounds', id: 4, subitems: [
        //         {type: 'link', href: "#", func: null, text: 'Select Background', id: 5},
        //         {type: 'link', href: "#", func: null, text: 'Clear Background', id: 6},
        //     ]
        // },
        // {type: 'submit', href: "/", func: {handleSubmit}, text: "Apply", id: 7},
        // {type: 'link', href: "/", func: null, text: "Back / Cancel", id: 8},
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
        // {type: "modalButton", href: "", func: () => setIsOpen(true), text: "openModal"},
        {type: "link", href: "", func: (e) => openModal(e), text: "upload background", id: "upload-background-modal"},
        {type: "link", href: "/", func: null, text: "Home"}
        // {type: "modalButton", href: "", func: null, text: "Open Modal"}
        // {type: "button", href: "", func:"onClick={() => setIsOpen(true)}", text: "open Modal"}
    ]

    const handleFile = (e) => {
        e.preventDefault();
        console.log("File to upload", file);
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

    const additionalProps = {
        preview: preview,
        previewImage: previewImage,
        handleFile: handleFile,
    }


    return (
        // <div className="new Scenario">
        //     <Header title={'Create New Scenario'}/>
        //     <Sidebar items={sideBarElements}/>
        //     {/*<Button */}
        //     <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        //         Fancy Modal
        //         <form onSubmit={(e) => handleFile(e)}>
        //             <input type={"file"} onInput={(e) => {
        //                 console.log("fileInput")
        //                 console.log(e.target.files[0])
        //                 setFile(e.target.files[0]);
        //             }}/>
        //             {file && <input type={"submit"} value={"choose file"} disabled={false}/>}
        //             {!file && <input type={"submit"} value={"choose file"} disabled={true}/>}
        //         </form>
        //     </Modal>
        //     <DisplayArea element={<Canvas pointToAdd={temp} coordinates={coordinates} setCoordinates={setCoordinates}/> }/>
        // </div>


        <div className="new Scenario">
            <Header title={'Create New Scenario'}/>
            <Sidebar items={sideBarElements}/>
            {/*<Modal open={isOpen} onClose={() => setIsOpen(false)}>*/}
            {/*    Fancy Modal*/}
            {/*    /!*{preview && console.log(preview)}*!/*/}
            {/*    {preview && <div className={"imagePreview"}><img src={preview} alt={"Error"}/> </div>}*/}
            {/*    <form onSubmit={(e) => handleFile(e)}>*/}
            {/*    <input type={"file"} accept={"image/*"} onInput={(e) => {*/}
            {/*        previewImage(e.target.files[0]);*/}
            {/*    }}/>*/}
            {/*        {preview && <input type={"submit"} value={"choose file"} disabled={false}/>}*/}
            {/*        {!preview && <input type={"submit"} value={"choose file"} disabled={true}/>}*/}
            {/*    </form>*/}
            {/*</Modal>*/}
            {/*<DisplayArea innerRef={measurePlayingArea} element={<Canvas pointToAdd={temp} coordinates={coordinates} setCoordinates={setCoordinates} /> }/>*/}
            {/*<DisplayArea innerRef={measurePlayingArea}/>*/}
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