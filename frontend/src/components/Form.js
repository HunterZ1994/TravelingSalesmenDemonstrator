import React, {useState} from "react";
import "../style/Form.css"
import Point from "./Points";
import {logDOM} from "@testing-library/react";

const Form = ({handleSubmit, coordinates, setCoordinates, setName, setBackground}) => {

    // const [coordinates, setCoordinates] = useState([]);
    // const [name, setName] = useState("");
    // const [id, setId] = useState("");
    // const [background, setBackground] = useState("");

    // const handleSumbit = (e) => {
    //     e.preventDefault();
    //     const scenario = {name, id, coordinates, background}
    //
    //     console.log(scenario);
    // }

    const [x_coordinate, setX_coordinate] = useState(0);
    const [y_coordinate, setY_coordinate] = useState(0);

    const handleAdd = () => {
        let addable = true;
        let temp = coordinates;
        let comp;
        let add = new Point(x_coordinate, y_coordinate)
        coordinates.forEach(
            element => {
                if(JSON.stringify(element) === JSON.stringify(add)){
                    addable = false;
                }
            }
        )
            // if(add.equals(comp)){
            //     return;
            // }
        console.log(JSON.stringify(add))
        if(addable){
            temp.push(add)
            setCoordinates(temp);
        }
        console.log(coordinates)
    }

    const handleRemove = (e) => {
        console.log(e);
    }
    return(
        <form onSubmit={(e) => handleSubmit(e)}>
            <label >Name:</label>
                <input
                    type="text"
                    name="Scenario Name"
                    required
                    onChange={(e) => setName(e.target.value)}
                />
            <div className={"CoordinateInput"}>
                <label >Coordinates</label>
                <input
                    type="number"
                    name="x_coordinate"
                    onChange={(e) => setX_coordinate(e.target.value)}
                />
                <input type="number"
                name="y_coordinate"
                onChange={(e) => setY_coordinate(e.target.value)}
                />
                <input type="button" value="Add Coordinate" onClick={(e) => handleAdd(e)}/>
                <input type="button" value="Remove Coordinate" onClick={(e) => handleRemove(e)}/>
            </div>
           <input type="submit" value="Upload Scenario"/>
           </form>
    );

}

export default Form;