import React from "react";
import style from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header=()=>{
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
                <div className={style.account}>Login</div>
            </div>
        </div>
    )
}

export default Header
