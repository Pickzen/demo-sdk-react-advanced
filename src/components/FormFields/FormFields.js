import React, { useState } from 'react';
import './FormFields.scss'

function FormFields({fields, showErrors}) {
    const getFieldValues = () => {
        return fields.map( field => field.getValue() );
    };

    const [fieldValues, setFieldValues] = useState(getFieldValues());

    const onChangeHandler = (event, field) => {
        field.setValue(event.target.value);
        setFieldValues(getFieldValues());
    };

    const getFieldClass = (field) => {
        return showErrors && !field.isValid()?'invalid':'';
    };

    const fieldsComp = fields.map( (field,i) => (
        <div key={i} className={'form-selection__input-container '+getFieldClass(field)}>
            <input type="text" value={fieldValues[i]} onChange={ (event) => onChangeHandler(event, field) } placeholder={field.getTitle()} />
        </div>
    ));

    return (
        <div className="form-selection">
            <div className="form-selection__grid">
                {fieldsComp}
            </div>
        </div>
    );
}

export default FormFields;