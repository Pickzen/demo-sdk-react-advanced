import React, { useContext } from 'react';
import { SlideContext } from '../../context/SlideContext';
import ListOptions from '../../components/ListOptions/ListOptions'
import Navigation from '../../components/Navigation/Navigation'
import Header from '../../components/Header/Header'
import './Question.css'

function Question() {
    const {slideModel} = useContext(SlideContext);
    
    return (
        <div className="slide filter">
            <Header />

            <ListOptions options={slideModel.getOptions()} />

            <Navigation />
        </div>
    );
}

export default Question;