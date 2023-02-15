import React from "react";
import Modal from "./Modal";

const EditScenarioModal = ({closeFn = () => null, open = false, additionalProps = {}}) => {
    return(
        <Modal open={open}>
            <div className="modal--mask">
                <div className="modal-window">
                    <header className="modal--header">
                        <h1>Modal One</h1>
                    </header>
                    <div className="modal--body">
                        <p>EditScenarioModal will be displayed here.</p>
                    </div>
                    <footer className="modal--footer">
                        <button type="button" className="modal--close-button" onClick={closeFn}>
                            Close
                        </button>
                    </footer>
                </div>
            </div>
        </Modal>
    )
}

export default EditScenarioModal;