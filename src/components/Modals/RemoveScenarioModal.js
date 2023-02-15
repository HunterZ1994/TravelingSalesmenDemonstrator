import React from "react";
import Modal from "./Modal";

const RemoveScenarioModal = ({closeFn = () => null, open = false, additionalProps = {}}) => {

   return(
       <Modal open={open}>
           <div className="modal--mask">
               <div className="modal-window">
                   <header className="modal--header">
                       <h1>Modal One</h1>
                   </header>
                   <div className="modal--body">
                      <select id={"scenarioName"} ref={additionalProps.scenarioSelector}>
                          {additionalProps.scenarioNames && additionalProps.scenarioNames.map(name => {
                              return <option value={name}>{name}</option>
                          })}
                      </select>
                       <input type={"button"} value={"remove Scenario"} onClick={(e) => additionalProps.handleScenarioRemove(e)}/>
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

export default RemoveScenarioModal;