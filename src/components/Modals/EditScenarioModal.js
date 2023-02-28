import React from "react";
import Modal from "./Modal";

const EditScenarioModal = ({closeFn = () => null, open = false, additionalProps = {}}) => {
    return(
        <Modal open={open}>
            <div className="modal--mask">
                <div className="modal-window">
                    <header className="modal--header">
                        <h1>Rename Scenario</h1>
                    </header>
                    <div className="modal--body">
                        <p>Rename your Scenarios</p>
                        <><select id={"backgroundName"} ref={additionalProps.scenarioSelector} className={"modal-select"}>
                            {additionalProps.scenarioNames && additionalProps.scenarioNames.map(sc => {
                                return <option value={sc}>{sc}</option>
                            })}
                        </select>
                            <input type={"text"} id={"newName"} ref={additionalProps.newScenarioNameFiled} className={"modal-input"}/>
                            </>
                       <> <input type={"button"} id={"rename"} value={"rename"} className={"modal-button"}
                                  onClick={(e) => additionalProps.handleScenarioRename(e)}/>
                        </>
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