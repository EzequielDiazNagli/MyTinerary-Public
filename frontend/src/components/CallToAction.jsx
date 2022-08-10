import React from "react"
import "../style/style.css"
import {Link as LinkRouter} from "react-router-dom"

function CallToAction() {

    return (
        <div className="callToAction">
            <LinkRouter to="/Cities">
            <button className="call">Choose your adventure!</button>
            </LinkRouter>
        </div>
    )
}

export default CallToAction