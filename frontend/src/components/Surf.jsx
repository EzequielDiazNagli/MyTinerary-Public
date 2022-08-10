import React from "react"
import "../style/style.css"
import surf from "../assets/surf.mp4"

function Surf() {

    return (
        <div className="surf">
            <div className="surfA">
                <h3>Many adventures await you</h3>
                <p>Choose one of the many activities we have for you. Great adventures await you. You will have a great time!</p>
            </div>
            <div className="surfB">
                <video className="cover-video" autoPlay loop muted>
                        <source src={surf} type="video/mp4" />
                </video>
            </div>
        </div>
    )
}

export default Surf