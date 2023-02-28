import React, {useEffect} from "react";
import Modal from "./Modal";

const ChooseBackgroundForScenarioModal = ({closeFn = () => null, open = false, additionalProps = {}}) => {
    return (
        <Modal open={open}>
            <div className="modal--mask">
                <div className="modal-window">
                    <header className="modal--header">
                        <h1>Choose Background Modal</h1>
                    </header>
                    <div className="modal--body">
                        <img style={{
                            width: "15vw",
                            height: "15vh",
                            objectFit: "cover",
                            objectPosition: "25% 25%"
                        }} ref={additionalProps.backgroundpreview} alt={"backgroundpreview"}/>
                        <><select id={"backgroundName"} ref={additionalProps.backgroundSelector}
                                  onInput={(e) => additionalProps.handleSelectChange(e)}>
                            {additionalProps.backgroundNames && additionalProps.backgroundNames.map(bg => {
                                return <option value={bg}>{bg}</option>
                            })}
                        </select>
                            <input type={"button"} value={"choose Background"} onClick={(e) => additionalProps.handleBackgroundSelect(e)}/>
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