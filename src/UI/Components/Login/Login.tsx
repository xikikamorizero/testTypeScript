import React from "react";
import { reduxForm, InjectedFormProps } from "redux-form";
import {Input, CreateField} from "../../common/FormControls/FormControls"
import {maxLengthCreator, required} from "../../common/FormControls/validation/validation"
import { connect } from "react-redux";
import {login} from "../../../BLL/auth-reducer"
import { Navigate } from "react-router-dom";
import style from "../../common/FormControls/FormControls.module.css"
import { AppStateType } from "../../../BLL/redux"
const maxLength30 = maxLengthCreator(30);


type LoginFormOwnProps={
    captchaUrl: string|null
}
const LoginForm:React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps>=({handleSubmit, error, captchaUrl})=>{
    return(
        <form onSubmit={handleSubmit}>
            {CreateField<LoginFormValuesKeyType>("Email", "email", [required, maxLength30], Input)}

            {CreateField<LoginFormValuesKeyType>("Password", "password", [required, maxLength30], Input, {type:"password"})}

            {CreateField<LoginFormValuesKeyType>(undefined, "rememberMe", [], Input, {type:"checkbox"}, "remember me")}
            {captchaUrl && <img src={captchaUrl} /> }
            {captchaUrl && CreateField<LoginFormValuesKeyType>("Symbols from image", "captcha", [required], Input, {})}
            {error && <div className={style.formSummaryError}>
                {error}
            </div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

export type LoginFormValuesType={
    email:string
    password:string
    rememberMe:boolean
    captcha:string
}


type LoginFormValuesKeyType = Extract<keyof LoginFormValuesType, string>


const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login'
})(LoginForm)

type MapStateToPropsType={
    isAuth:boolean
    captchaUrl:string|null
}
type MapDispatchToPropsType={
    login:(email:string, password:string, rememberMe:boolean, captcha:string)=>void
}

const Login:React.FC<MapStateToPropsType & MapDispatchToPropsType>=(props)=>{
    const onSubmit = (formData:any) =>{
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if(props.isAuth){
        return <Navigate to={"/profile"} />
    }
    return(
        <div>
            <h1>Login</h1>
            <LoginReduxForm captchaUrl={props.captchaUrl} onSubmit={onSubmit} />
        </div>
    );
}

const mapStateToProps=(state:AppStateType):MapStateToPropsType=>{
    return({
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl
    })
}
export default connect(mapStateToProps, {login} ) (Login);