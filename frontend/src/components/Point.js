import React, {useRef, useState} from "react"

const Point = ({x_coordinate,y_coordinate, selected, click}) => {




    const x_value = x_coordinate;
    const y_value = y_coordinate;
    // const [selected, setSelected] = useState(false)

    // const click = () => {
    //     pointRef.sty
    // }

    function getStyle(x,y){

        if(selected){
            return {
                zIndex: 2,
                position: "absolute",
                left: x,
                top: y,
                border: "1px solid red"
            }
        }else{
            return {
                zIndex: 2,
                position: "absolute",
                left: x,
                top: y
            }
        }
    }

    // const handleClick = (e) => {
    //     e.preventDefault();
    //     pointRef = pointRef.current
    //     console.log("pointClikced: ", e.target);
    //     console.log("currentRef", pointRef);
    // }

    return (<input type="image" src={require("../images/punkt.gif")} alt={"#ref"} style={getStyle(x_coordinate,y_coordinate)} onClick={click}/>);
}

export default Point

