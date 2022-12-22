import React from "react";
import style from "./FormsControl.module.css";
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import {ValidatorType} from "./validation/validation";


type FormControlsPropsType = {
    meta:WrappedFieldMetaProps
    children:React.ReactNode
}

const FormsControl:React.FC<FormControlsPropsType> = ({ meta: { touched, error }, children }) => {
    const hasError = touched && error;
    return (
        <div className={style.formControl + " " + (hasError ? style.error : '')}>
            <div>
                {children}
            </div>
    {hasError && <span>{error}</span>}
    </div>
    );
    }

    export const Textarea:React.FC<WrappedFieldProps> = (props) => {
        const { input, meta, ...restProps } = props;
        return (
            <FormsControl {...props}><textarea {...input} {...restProps} /></FormsControl>
    );
    }

    export const Input:React.FC<WrappedFieldProps> = (props) => {
        const { input, meta, ...restProps } = props;
        return (
            <FormsControl {...props}><input {...input} {...restProps} /></FormsControl>
    );
    }

    export function CreateField<FormKeysType extends string>(placeholder:string|undefined, name:FormKeysType, validate:Array<ValidatorType>, component:React.FC<WrappedFieldProps>, props = {}, text = "") {
     return(
        <div>
            <Field placeholder={placeholder} name={name} component={component}
                   validate={validate} {...props} />{text}
        </div>
     )}
