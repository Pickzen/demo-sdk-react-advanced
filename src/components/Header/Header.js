import React, { useContext } from 'react';
import { SlideContext } from '../../context/SlideContext'
import CustomHTML from '../../components/CustomHTML/CustomHTML'
import './Header.scss'

function Header() {
    const {slideModel} = useContext(SlideContext);

    return (
        <div className="slide__description">
            <CustomHTML className="question" html={slideModel.getTitle()} />
            <CustomHTML className="question__description" html={slideModel.getSubtitle()} />
        </div>
    );
}

export default Header;
