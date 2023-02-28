import React from "react";
import "../style/Header.css"

const Header = ({title}) => {
    return ( 
        <div className="header">
            <div className="menuburger"></div>
            <div className="headline">{title}</div>
            <a href={"http://www.hs-mannheim.de"}><img className={"hsLinkImage"} src={require("../images/logo_hs-mannheim_klein_icon.ico") } alt={"hs-mannheim.de"}/> </a>
        </div>
     );
}
 
export default Header;