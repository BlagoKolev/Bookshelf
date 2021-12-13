import React from 'react';
import { Field, ErrorMessage } from 'formik';

function TextArea(props) {

    const {label, name, ...rest} = props;
     
    return (
        <div className='formControl'>
            <label htmlFor={name} >{label}</label>
            <Field id={name} name={name} {...rest} />
        </div>
    )
}

export default TextArea;