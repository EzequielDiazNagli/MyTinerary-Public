import React from "react"
import "../style/style.css"
import resort from "../assets/resort.mp4"

function Resort() {

    return (
        <div className="resort">
            <div className="resortA">
                <video className="cover-video" autoPlay loop muted>
                    <source src={resort} type="video/mp4" />
                </video>
            </div>
            <div className="resortB">
                <h3>Beautiful places to rest</h3>
                <p>Explore different places to rest and renew your energy. Enjoy different cultures, food and music. You will not regret!</p>
            </div>
        </div>
    )
}

export default Resort