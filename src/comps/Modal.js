import React from 'react';
import Fade from "react-reveal/Fade"

export default function Modal ({ selectedImg, setSelectedImg })  {
    // going back from full image view 
    const handleClick = (e) =>{
        //if click on rest area of full image we need to go back so set value null
        if(e.target.classList.contains('backdrop')){
            setSelectedImg(null);
        }
    }

    return (
        <div className="backdrop" onClick={handleClick}>
            <Fade top cascade> 
                <img src={selectedImg} alt="Loading..."/> 
            </Fade>
        </div>
    )
}

