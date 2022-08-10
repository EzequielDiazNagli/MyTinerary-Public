import React from "react"
import DatosExtra from "./DatosExtra"
import Extra2 from "./Extra2"

function Info () {
    return (
        <>
        <h1>Titulo</h1>
        {DatosExtra.map(info => (
        <Extra2 key={info.title}
        title={info.title}
        text={info.text}
        video={info.video}
        />
        ))}
        </>
    )
}

export default Info