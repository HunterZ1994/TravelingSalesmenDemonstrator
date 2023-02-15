import {useState, useRef, useEffect} from "react";
import React from "react";
import Form from "./Form";
import ModalButton from "./ModalButton";

import "../style/SideBarItem.css"

const SidebarItem = ({items, handleSubmit, handleAdd}) => {

    const X_Coordinate = useRef(null);
    const Y_Coordinate = useRef(null);

    const [showDropdown, setShowDropdown] = useState(false);

    function getElementToDisplay(item) {
        if (item.subitems) {
            return (<>
                <button className="dropdownBtn"
                        onClick={() => setShowDropdown(!showDropdown)}>{item.text} {"\u2B9F"}</button>
                {showDropdown && <div className="dropdown-container">
                    {item.subitems.map((subItem) => {
                        return getElementToDisplay(subItem);
                    })}
                </div>}</>)
        } else {
            switch (item.type) {
                case 'link':
                    return <a href={item.href} onClick={item.func} id={item.id}>{item.text}</a>
                case 'button':
                    return <input type="button" value={item.text} onClick={item.func}
                                  className={"genericButton"}/>
                case 'textInput':
                    return (
                        <label>{item.text} :
                            <input className={"Textinput"} type={"text"} id={item.text}/>
                        </label>
                    );
                case 'coordianteInput':
                    return (
                        <label>{item.text} :
                            <input className={"CoordinateInput"} id={"X-Coordinate"} ref={X_Coordinate} type="number"
                                   min="0" step="1"/> / <input
                                className={"CoordinateInput"} id={"Y-Coordinate"} ref={Y_Coordinate} type="number"
                                min="0" step="1"/>
                            <br/>
                            <input type={"button"} value={"remove"} className={'removeButton'}/> <input type={"button"}
                                                                                                        value={"add"}
                                                                                                        className={"addButton"}
                                                                                                        onClick={() => handleAdd(X_Coordinate.current, Y_Coordinate.current)}/>
                        </label>
                    );
                // case 'Modalbutton':
                case "Form":
                    return (
                        //USE IT LIKE THIS!
                        //  {type: "Form", href: "", handleSubmit: handleSubmit, setCoordinates: setCoordinates, setName: setName, setBackground: setBackground, text: ""},
                        <Form handleSubmit={item.handleSubmit} coordinates={item.coordinates} setName={item.setName} setCoordinates={item.setCoordinates} setBackground={item.setBackground}></Form>
                    )
                case "submit":
                    return <input type={"button"} value={item.text} onClick={() => handleSubmit()}/>
                case "modalButton":
                    return <ModalButton value={item.text} openModal={item.func}/>
                default:
                    return <p className="error">#####</p>
            }
        }
    }

    return getElementToDisplay(items);

}

export default SidebarItem