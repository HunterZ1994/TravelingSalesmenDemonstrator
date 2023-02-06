import { useEffect, useState } from "react";
import DisplayArea from "../components/DisplayArea";
import Header from "../components/Header";
// import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
// import Canvas from "../components/Canvas";
// import ImageBackground from "../components/imageBackground";

import React from "react";

const Home = () => {

    const sideBarItems = [
        {type: "link", href:"/", func: null, text: "Home", id: 1},
        {type: "link", href:"/playScenario", func: null, text: "New Game", id:2},
        {type: "link", href:"/manageScenarios", func: null, text: "Manage Scenarios", id:3},
        // {type: "textinput", text: "Testinput"}
    ]

    return (
        <div className="home">
            <Header title={'The Traveling Salesmen'} />
            <Sidebar items = {sideBarItems}/>
            <DisplayArea />
        </div>
    );
}

export default Home;