import React, { useState, useContext } from 'react';
import { SlideContext } from '../../context/SlideContext';
import CustomHTML from "../CustomHTML/CustomHTML";
import './ListOptions.scss'

function ListOptions({options}) {
    const [slideId, setSelectedId] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const {slideModel, displayCurrentSlide} = useContext(SlideContext);

    const refreshSelectedOptions = () => {
        setSelectedOptions( options.map( o => o.isSelected() ) );
    };

    if (slideModel.getId()!==slideId) {
        refreshSelectedOptions();
        setSelectedId(slideModel.getId());
    }

    const select = ( o ) => {
        slideModel.selectOption(o);
        refreshSelectedOptions();
        displayCurrentSlide();
    };

    return (
        <div className="text-selection__grid">
            { options.filter( o => !o.isHidden() ).map((o, i) => (
                <div onClick={() => select(o)}
                     className={`text-selection__element ${selectedOptions[i] ? 'selected' : ''} ${ o.isDisabled()?'disabled':'' }`}
                     key={o.getId()}>

                    {o.hasImage()?
                        <div className="text-selection__image" style={{backgroundImage: `url(${o.getImage()})`}}>
                        </div>:null}

                    <div className="text-selection__info">
                        <CustomHTML className="text-selection__text" html={o.getTitle()} />
                    </div>
                </div>
            )) }
        </div>
    );
}

export default ListOptions;