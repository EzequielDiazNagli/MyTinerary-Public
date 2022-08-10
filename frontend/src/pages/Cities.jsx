import React from "react";
import "../style/style.css";
import Buscador from "../components/Buscador"

function Cities() {

    return (
        <>
        <div className="header-cities">
            <div className="findNewAventures">
                <h2>Find New Adventures!</h2>
            </div>
        </div>
        <Buscador/>
        </>
    )
}
export default Cities