import React from "react";
import Modal from "./Modal";

const UploadBackgroundModal = ({closeFn = () => null, open = false, additionalProps = {}}) => {
    return (
        <Modal open={open}>
            <div className="modal--mask">
                <div className="modal-window">
                    <header className="modal--header">
                        <h1>Modal One</h1>
                    </header>
                    <div className="modal--body">
                        {additionalProps.preview && <div className={"imagePreview"}><img src={additionalProps.preview} alt={"Error"}/> </div>}
                        <form onSubmit={(e) => additionalProps.handleFile(e)}>
                            <input type={"file"} accept={"image/*"} onInput={(e) => {
                                additionalProps.previewImage(e.target.files[0]);
                            }}/>
                            {additionalProps.preview && <input type={"submit"} value={"choose file"} disabled={false}/>}
                            {!additionalProps.preview && <input type={"submit"} value={"choose file"} disabled={true}/>}
                        </form>
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

export default UploadBackgroundModal
