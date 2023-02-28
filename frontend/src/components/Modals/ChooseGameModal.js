import React from "react";

import Modal from "./Modal";

const ChooseGameModal = ({closeFn = () => null, open = false, additionalProps = {}}) => {
    return (<Modal open={open}>
        <div className="modal--mask">
            <div className="modal-window">
                <header className="modal--header">
                    <h1>Select your game</h1>
                </header>
                <div className="modal--body">
                    <form className={"modal-form"} onSubmit={(e) => additionalProps.handleScenarioChoice(e)}>
                        <label>Choose a Scenario</label>
                        <select  className={"modal-select"} name={"scenario"} id={"scenarioSelector"} ref={additionalProps.scenarioSelect}>
                            {additionalProps.scenarioNames && additionalProps.scenarioNames.map((scenarioName) => {
                                    return <option value={scenarioName}>{scenarioName}</option>
                                }
                            )}
                        </select>
                        <input type={"submit"} value={"pick!"} className={"modal-button"}/>
                    </form>
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

export default ChooseGameModal;