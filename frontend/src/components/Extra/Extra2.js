import React from "react";

function Extra2({title, text, video}) {
    return (
        <div className="resort">
            <div className="resortA">
                <video className="cover-video" autoPlay loop muted>
                    <source src={video} type="video/mp4" />
                </video>
            </div>
            <div className="resortB">
                <h3>{title}</h3>
                <p>{text}</p>
            </div>
        </div>
    )
}

export default Extra2