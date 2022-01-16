import React, {useEffect} from 'react'
import useStorage from "../hooks/useStorage";
import {motion} from "framer-motion";

const ProgressBar = ({file, setFile}) => {
    const {url, progress} = useStorage(file);

    useEffect(() => {
        //if we have url means progress=100% image uploded so we dont need to show progress bar anymore so set file==null and progress bar will disapperare(beacuse in uploadform.js we did file&&prgressbar)
        if(url){          
            setFile(null);
        }
    }, [url, setFile])

    return (
        <motion.div className="progress-bar" 
            initial={{width: 0}} 
            animate={{width: progress + "%"}}
        ></motion.div>
    )
}

export default ProgressBar;
