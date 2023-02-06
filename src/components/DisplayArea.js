import React from 'react';
import "../style/Displayarea.css"
const DisplayArea = ({innerRef, element}) => {
    return (
        <div  ref={innerRef} className="displayArea">
            <div  className="playingArea">
                {element}
            </div>
        </div>
    );
}
 
export default DisplayArea
