import React, {useContext} from 'react';
import './InlineResults.scss'
import Result from "../Result/Result";
import {SlideContext} from "../../context/SlideContext";

const InlineResults = ({results}) => {
    const {Engine} = useContext(SlideContext);

    return (
        <div className="inline-results">

            <p className="inline-results__header">{Engine.getEndSlide().getTitle()}</p>

            <div className="inline-results__products">
                {results.map( (result) => <Result className="product" key={result.getId()} value={result}/> )}
            </div>
        </div>
    )
};

export default InlineResults;