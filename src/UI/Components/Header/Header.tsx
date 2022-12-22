import React from "react";
import style from './Header.module.css'
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux'
import {AppStateType} from "../../../BLL/redux";
import {Nullean} from "../../../types/types";
import {DispatchType, logout, ThunkType} from "../../../BLL/auth-reducer";


const Header: React.FC<MapStateToPropsType & MapDispatchToPropsType>=(props)=>{
    return(
        <div className={style.header}>
            <div className={style.headerContainer}>
                <div className={style.headerLogo}>Hello</div>
                <div className={style.headerMenu}>
                    <NavLink to={'/'}>Главная</NavLink>
                    <NavLink to={'/users'}>Пользователи</NavLink>
                    <NavLink to={'/profile'}>Профиль</NavLink>
                    <NavLink to={'/poetry'}>Произведение</NavLink>
                    <NavLink to={'/aboutUs'}>О нас</NavLink>
                </div>
                <div className={style.account}>{props.login}</div>
                <button onClick={props.logout}>TYT</button>
            </div>
        </div>
    )
}

type MapStateToPropsType={
    isAuth:boolean,
    login:Nullean<string>
}
type MapDispatchToPropsType={
    logout:()=>void
}

const mapStateToProps = (state:AppStateType)=>({
    isAuth:state.auth.isAuth,
    login:state.auth.login
})


export default connect(mapStateToProps, {logout})(Header)
