import React from 'react'
import ReactDOM from 'react-dom'
import "../style/Modal.css"

const MODAL_STYLES = {

}

export default function Modal({open, children, onClose}) {
    if(!open){
        return (<></>)
    }
    return (
        <>
            <div className={"modalOverlay"}></div>
            <div className={"modalBody"} style={MODAL_STYLES}>
                <button className={"closeModal"} onClick={onClose}>Close Modal</button>
                {children}
            </div>
        </>

    )
}
