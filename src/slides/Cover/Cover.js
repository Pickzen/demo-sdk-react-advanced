import React, { useContext } from 'react';
import { SlideContext } from '../../context/SlideContext'
import CustomHTML from '../../components/CustomHTML/CustomHTML'
import Header from '../../components/Header/Header'
import './Cover.scss'

function Cover() {
    const {slideModel, displayCurrentSlide} = useContext(SlideContext);

    const start = () => {
        slideModel.start();
    	displayCurrentSlide();
    };

    const headerBackground = () => {
        if (slideModel.hasImage()) {
            return {backgroundImage:`linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${slideModel.getImage()})`}
        } else {
            return null
        }
    };

    return (
        <div className="slide cover">
            <div className="header-holder" style={headerBackground()}>

                <div className="box">
                    <Header />

                    <div className="cover-button-holder">
                        <button onClick={start}>
                            <CustomHTML html={slideModel.getStartLabel()} />
                        </button>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default Cover;
