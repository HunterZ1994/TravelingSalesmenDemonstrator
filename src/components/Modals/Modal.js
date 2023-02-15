import React from "react";
import ReactDOM from "react-dom";

const ModalRootE1 = document.getElementById("modal-root");

const Modal = ({children, open = false}) => {
    if(!open) return null;

    return ReactDOM.createPortal(children, ModalRootE1);
}

export default Modal;