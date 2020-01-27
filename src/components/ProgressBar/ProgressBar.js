import React, {useContext} from 'react';
import './ProgressBar.scss'
import {SlideContext} from "../../context/SlideContext";

const ProgressBar = () => {
    const {progress} = useContext(SlideContext);

    return (
        <div className="progress-bar">
            <div style={{width:progress+'%'}} className="status" />
        </div>
    )
};

export default ProgressBar;