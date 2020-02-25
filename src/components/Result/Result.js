import React, {useState, useContext} from 'react';
import CustomHTML from "../CustomHTML/CustomHTML";
import Specs from "../Specs/Specs";
import { SlideContext } from '../../context/SlideContext';
import './Result.scss'

const Result = ({value:result, className}) => {
	const [compareChecked, setCompareChecked] = useState(false);
	const {compare} = useContext(SlideContext);

	const compareCTA = () => {
		if (!compareChecked) {
			toggleCompare();
		} else {
			// Star compare
			compare.show(true);
		}
	};

	const toggleCompare = () => {
		const currentCompare = !compareChecked;
		setCompareChecked(currentCompare);

		if (currentCompare) {
			compare.addItem(result.getId());
		} else {
			compare.removeItem(result.getId());
		}
	};

    return (
	    <div className={className}>
			<CustomHTML className="title" html={result.getTitle()} />
			<div className="image">
				<a href={result.getLink()}><img alt="" src={result.getImage()} /></a>
			</div>

			<div className="info">
				<CustomHTML className="price" html={result.getLocalizedPrice()} />
				<CustomHTML className="description" html={result.getDescription()} />
			</div>

			<Specs data={result.getSpecs()}/>

			<div className="compare">
				<span className={ 'checkbox' + (compareChecked?' selected':'') } onClick={toggleCompare}></span>
				<span onClick={compareCTA}>{compareChecked?'Start compare':'Compare'}</span>
			</div>

			<div className="cta">
				<a className="button view" href={result.getLink()}>{result.getViewCTA()}</a>
				<button className="button cart" href="#">{result.getCartCTA()}</button>
			</div>
	    </div>
    )
};

export default Result;