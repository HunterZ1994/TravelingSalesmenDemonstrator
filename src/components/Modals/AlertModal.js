import React from "react";

import Modal from "./Modal";

const AlertModal = ({closeFn = () => null, open = false, additionalProps = {}}) => {
    return (<Modal open={open}>
        <div className="modal--mask">
            <div className="modal-window">
                <header className="modal--header">
                    <h1>ALERT!!!!!</h1>
                </header>
                <div className="modal--body">

                </div>
                <footer className="modal--footer">
                    <button type="button" className="modal--close-button" onClick={closeFn}>
                        Close
                    </button>
                </footer>
            </div>
        </div>
    </Modal>)
}

export default AlertModal;