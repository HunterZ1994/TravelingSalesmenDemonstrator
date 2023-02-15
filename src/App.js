import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import PlayScenario from "./pages/PlayScenario";
import ManageScenarios from "./pages/ManageScenarios";
import NewScenario from "./pages/NewScenario";
import "./style/App.css";

const App = () => {

    return(
        <Router>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route path ="/loadScenario/" element={<PlayScenario/>}/>
                <Route exact path="/playScenario" element={<PlayScenario/>}/>
                <Route exact path="manageScenarios" element={<ManageScenarios/>}/>
                <Route exaxt path="newScenario" element={<NewScenario />}/>
            </Routes>
        </Router>
    )
}

export default App