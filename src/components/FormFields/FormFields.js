import React, { useState } from 'react';
import './FormFields.scss'
import CustomHTML from "../CustomHTML/CustomHTML";
import ImageUpload from "../ImageUpload/ImageUpload";

function FormFields({fields, showErrors}) {
    const getFieldValues = () => {
        return fields.map( field => field.getValue() );
    };

    const [fieldValues, setFieldValues] = useState(getFieldValues());

    const onChangeHandler = (event, field) => {
        if (field.getType()==='checkbox') {
            field.setValue(event.target.checked);
        } else {
            field.setValue(event.target.value);
        }

        setFieldValues(getFieldValues());
    };

    const getFieldErrorClass = (field) => {
        return showErrors && !field.isValid()?'invalid':'';
    };

    const fieldsComp = fields.map( (field,i) => {
        const type = field.getType();

        let el;
        if (type==='checkbox') {
            el = (
                <label>
                    <input type="checkbox" checked={fieldValues[i]}
                           onChange={(event) => onChangeHandler(event, field)}/>
                    <CustomHTML className="title" html={field.getTitle()}/>
                </label>
            );
        } else if (type==='image') {
            el = <ImageUpload field={field} showErrors={showErrors} />
        } else {
            el = (
                <input type="text" value={fieldValues[i]} onChange={ (event) => onChangeHandler(event, field) } placeholder={field.getTitle()} />
            )
        }

        return (
            <li key={i} className={`${field.getType()} ${getFieldErrorClass(field)}`}>
                {el}
            </li>);
    });

    return (
        <div className="form-selection">
            <ul className="form-fields">
                {fieldsComp}
            </ul>
        </div>
    );
}

export default FormFields;