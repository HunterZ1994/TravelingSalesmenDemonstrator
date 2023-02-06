import { useState } from "react";
import SidebarItem from "./SidebarItem";
import "../style/Sidebar.css";
import React from "react";

// const Sidebar = ({ items, method }) => {
const Sidebar = ({items, handleSubmit, handleAdd, setOpenModal}) => {
    // console.log(items);
    // console.log(handleSubmit)
    // const closeSidebar = () => {
    //     console.log("close sidebar");
    //     // console.log(items);
    //     items.map((item) => {
    //         console.log(item);
    //         console.log(typeof item)
    //         console.log(Array.isArray(item));
    //     })
    // }

    const [showDropdown, setShowDropdown] = useState(false);
    const closeSidebar = () =>{
        console.log("close sidebar");
    }

    // console.log(items)
  

    return (
        <div className="sideBar">
            {/*<p className='btn-close' id="btn-close" onClick={closeSidebar}>&times;</p>*/}
            {items.map((item) => {
                return (<SidebarItem items={item} handleSubmit={handleSubmit} handleAdd = {handleAdd} setOpenModal={setOpenModal}/>)
            })}
        </div>
    );
}

export default Sidebar;