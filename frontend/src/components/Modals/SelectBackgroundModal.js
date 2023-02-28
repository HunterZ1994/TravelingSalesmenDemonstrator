import Modal from "./Modal";
import React from "react";

const SelectBackgroundModal = ({closeFn = () => null, open = false, additionalProps = {}}) => {
    return(
        <Modal open={open}>
            <div className="modal--mask">
                <div className="modal-window">
                    <header className="modal--header">
                        <h1>Select Scenario Background</h1>
                    </header>
                    <div className="modal--body">
                        <p>Choose Your background for this scenario</p>
                        <img style={{
                            width: "15vw",
                            height: "15vh",
                            objectFit: "cover",
                            objectPosition: "25% 25%"
                        }} ref={additionalProps.backgroundpreview} alt={"backgroundpreview"}/>
                        <><select id={"backgroundName"} ref={additionalProps.backgroundSelector} className={"modal-select"}
                                  onInput={(e) => additionalProps.handleSelectChange(e)}>
                            {additionalProps.backgroundNames && additionalProps.backgroundNames.map(bg => {
                                return <option value={bg}>{bg}</option>
                            })}
                        </select>
                            <input type={"button"} className={"modal-button"} value={"select"} onClick={(e) => additionalProps.selectBackground(e)}/>
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
    );
}

export default SelectBackgroundModal;