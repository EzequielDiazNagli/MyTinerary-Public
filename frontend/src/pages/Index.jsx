import React from "react"
import "../style/style.css"
import Carousel from "../components/Carousel"  
import Header from "../components/Header"
import Resort from "../components/Resort"
import Surf from "../components/Surf"

function Main() {

    return (
        <>
            <Header/>
            <main>
                <div className="main-a">
                    <h3>Popular MyTineraries!</h3>
                </div>
                <div className="main-b">
                    <Carousel />
                </div>
            </main>
            <div className="container-info">
            <Resort/>
            <Surf/>
            </div>
        </>
    )
}

export default Main