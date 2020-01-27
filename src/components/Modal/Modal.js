import React, {useState} from 'react';

import './Modal.scss'

const Modal = (props) => {
    const [bodyOverflow, setBodyOverflow] = useState(null);

    if (bodyOverflow==null) {
        setBodyOverflow(document.body.style.overflow);
        document.body.style.overflow='hidden';
    }

    const closeHandler = () => {
        document.body.style.overflow=bodyOverflow;
        props.close();
    };

    return (
        <div className="modal">
            <div className="overlay" />
            <div className="panel">
                <div className="modal-header">
                    <div className="modal-title">{props.title}</div>
                    <div onClick={closeHandler} className="close"></div>
                </div>
                <div className="modal-content">
                    {props.children}
                </div>
            </div>
        </div>
    )
};

export default Modal;