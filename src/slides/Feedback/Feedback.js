import React, { useContext } from 'react';
import { SlideContext } from '../../context/SlideContext';
import Navigation from '../../components/Navigation/Navigation'
import Header from "../../components/Header/Header";
import './Feedback.scss'

function Feedback() {
    const { slideModel } = useContext(SlideContext);
    const { nav } = useContext(SlideContext);

    if (slideModel.isAutoadvance()) {
        slideModel.waitToAutoadvance().then( () => {
            nav.next();
        });
    }

    return (
        <div className="slide feedback">
            <Header />

            { !slideModel.isAutoadvance()?<Navigation />:null }
        </div>
    );
}

export default Feedback;