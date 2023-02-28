import React from "react";

import UploadBackgroundModal from "./Modals/UploadBackgroundModal";
import RemoveScenarioModal from "./Modals/RemoveScenarioModal";
import EditScenarioModal from "./Modals/EditScenarioModal";
import ChooseBackgroundModal from "./Modals/ChooseBackgroundModal";
import SelectBackgroundModal from "./Modals/SelectBackgroundModal";
import VictoryModal from "./Modals/VictoryModal";
import AlertModal from "./Modals/AlertModal";
import ChooseGameModal from "./Modals/ChooseGameModal";

const ModalManager = ({closeFn, modal = "", additionalProps = {}}) => {
    return (
        <>
            <UploadBackgroundModal closeFn={closeFn} open={modal === "upload-background-modal"} additionalProps={additionalProps}/>
            <RemoveScenarioModal closeFn={closeFn} open={modal === "remove-scenario-modal"} additionalProps={additionalProps}/>
            <EditScenarioModal closeFn={closeFn} open={modal === "edit-scenario-modal"} additionalProps = {additionalProps}/>
            <ChooseBackgroundModal closeFn={closeFn} open={modal === "choose-background-modal"} additionalProps={additionalProps}/>
            <SelectBackgroundModal closeFn={closeFn} open={modal === "select-background-modal"} additionalProps={additionalProps}/>
            <VictoryModal closeFn={closeFn} open={modal === "victory-modal"} additionalProps={additionalProps}/>
            <AlertModal closeFn={closeFn} open={modal === "alert-modal"} additionalProps={additionalProps}/>
            <ChooseGameModal closeFn={closeFn} open={modal === "choose-game-modal"} additionalProps={additionalProps}/>
        </>
    )
}

export default ModalManager