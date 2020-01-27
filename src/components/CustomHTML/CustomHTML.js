import React from 'react';

function CustomHTML({html, className}) {
    const sanitize = (html) => ({ __html: html });

    return (
        <div className={className} dangerouslySetInnerHTML={sanitize(html)} />
    );
}

export default CustomHTML;