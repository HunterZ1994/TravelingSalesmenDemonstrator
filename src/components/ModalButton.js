import React from "react";

const ModalButton = ({openModal, value}) => {
    return(
        <input type={'button'} onClick={(e) => openModal()} value={value} className={"genericButton"}/>
    )
}

export default ModalButton;