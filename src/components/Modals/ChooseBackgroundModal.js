import React, {useEffect} from "react";
import Modal from "./Modal";

const ChooseBackgroundModal = ({closeFn = () => null, open = false, additionalProps = {}}) => {
    return (
        <Modal open={open}>
            <div className="modal--mask">
                <div className="modal-window">
                    <header className="modal--header">
                        <h1>Choose Background Modal</h1>
                    </header>
                    <div className="modal--body">
                        <p>ChooseBackgroundModal will be displayed here</p>
                        <img style={{
                            width: "15vw",
                            height: "15vh",
                            objectFit: "cover",
                            objectPosition: "25% 25%"
                        }} ref={additionalProps.backgroundpreview} alt={"backgroundpreview"}/>
                        <> <input type={"button"} id={"rename"} value={"rename"}
                                  onClick={(e) => additionalProps.handleBGRename(e)}/>
                            <input type={"text"} id={"newName"} ref={additionalProps.newNameFiled}/>
                            <input type={"button"} id={"deleteBackground"} value={"delete"}
                                   onClick={(e) => additionalProps.handDeleteBackground(e)}/></>
                        <><select id={"backgroundName"} ref={additionalProps.backgroundSelector}
                                  onInput={(e) => additionalProps.handleSelectChange(e)}>
                            {additionalProps.backgroundNames && additionalProps.backgroundNames.map(bg => {
                                return <option value={bg}>{bg}</option>
                            })}
                        </select>
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

export default ChooseBackgroundModal;