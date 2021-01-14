import React, { useContext } from 'react';
import { SlideContext } from '../context/SlideContext';
import Cover from '../slides/Cover/Cover';
import Question from '../slides/Question/Question';
import Feedback from '../slides/Feedback/Feedback';
import Form from '../slides/Form/Form';
import End from '../slides/End/End';
import InlineResults from '../components/InlineResults/InlineResults';
import ProgressBar from "../components/ProgressBar/ProgressBar";
import Compare from "../components/Compare/Compare";

const Slide = () => {
    const { slideModel, results, compare } = useContext(SlideContext);

    const getSlideView = () => {
        switch (slideModel.getType()) {
            case 'Cover': return <Cover />;
            case 'Question': return <Question />;
            case 'Feedback': return <Feedback />;
            case 'Form': return <Form />;
            case 'End': return <End />;
            default: return null;
        }
    };

    return (
        <div className="content">
            <ProgressBar/>

            {compare.isVisible? <Compare results={results} />:null}

            {getSlideView()}

            {results? <InlineResults results={results}/>:null}
        </div>
    )
};

export default Slide