import React from "react"
import "../style/style.css"
import Welcome from "./Welcome"
import CallToAction from "./CallToAction"

function Header() {

    return (
      <div className="header">
        <Welcome/>
        <CallToAction/>
      </div>
    )
}

export default Header