import React from "react";

import UploadBackgroundModal from "./Modals/UploadBackgroundModal";
import RemoveScenarioModal from "./Modals/RemoveScenarioModal";
import EditScenarioModal from "./Modals/EditScenarioModal";
import ChooseBackgroundModal from "./Modals/ChooseBackgroundModal";

const ModalManager = ({closeFn, modal = "", additionalProps = {}}) => {
    return (
        <>
            <UploadBackgroundModal closeFn={closeFn} open={modal === "upload-background-modal"} additionalProps={additionalProps}/>
            <RemoveScenarioModal closeFn={closeFn} open={modal === "remove-scenario-modal"} additionalProps={additionalProps}/>
            <EditScenarioModal closeFn={closeFn} open={modal === "edit-scenario-modal"} additionalProps = {additionalProps}/>
            <ChooseBackgroundModal closeFn={closeFn} open={modal === "choose-background-modal"} additionalProps={additionalProps}/>
        </>
    )
}

export default ModalManager