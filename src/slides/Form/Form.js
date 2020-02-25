import React, { useContext, useState } from 'react';
import { SlideContext } from '../../context/SlideContext';
import FormFields from "../../components/FormFields/FormFields";
import Navigation from '../../components/Navigation/Navigation'
import Header from "../../components/Header/Header";
import './Form.css'

function Form() {
    const { slideModel, nav } = useContext(SlideContext);
    const [showErrors, setShowErrors] = useState(false);

    const next = () => {
        if (slideModel.validate()) {
            nav.next();
        } else {
            setShowErrors(true);
        }
    };

    return (
        <div className="slide form">
            <Header />

            <FormFields showErrors={showErrors} fields={slideModel.getFields()} />
            
            <Navigation next={next} />

        </div>
    );
}

export default Form;