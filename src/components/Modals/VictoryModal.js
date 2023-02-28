import React from "react";

import Modal from "./Modal";

const VictoryModal = ({closeFn = () => null, open = false, additionalProps = {}}) => {
   return( <Modal open={open}>
        <div className="modal--mask">
            <div className="modal-window">
                <header className="modal--header">
                    <h1>VICTORYYY!!!!!</h1>
                </header>
                <div className="modal--body">
                    <><label>Best Solution: </label><label>{additionalProps.solutionLength}</label></>
                        <><label>Your Solution: </label><label>{additionalProps.playerLength}</label></>
                      <input type={"button"} className={"modal-button"} name={"solution"} value={"Show Solution"} onClick={() => additionalProps.handleSolutionModal()}/>
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

export default VictoryModal