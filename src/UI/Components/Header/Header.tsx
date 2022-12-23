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

export type MapStateToPropsType={
    isAuth:boolean,
    login:Nullean<string>
}

export type MapDispatchToPropsType={
    logout:()=>void
}

const mapStateToProps = (state:AppStateType)=>({
    isAuth:state.auth.isAuth,
    login:state.auth.login
})


export default connect(mapStateToProps, {logout})(Header)

// import React from 'react';
// import s from './Header.module.css';
// import { NavLink } from "react-router-dom";
// import logoutIcon from "../../assets/images/logoutIcon.png"
// import logo from "./../../assets/images/Logo1.png"
// import MenuBurger from './MenuBurger/MenuBurger';
//
//
// const Header = (props) => {
//     return (
//         <div className={s.Header}>
//             <div className={s.header}>
//                 <div className={s.content}>
//                     <div className={s.logo}>
//                         <NavLink to={'/main'}>
//                             <img src={logo}></img>
//                         </NavLink>
//                     </div>
//                     <div className={s.menuHrefs}>
//                         <NavLink to={'/'}>Главная</NavLink>
//                         <NavLink to={'/users'}>Пользователи</NavLink>
//                         <NavLink to={'/profile'}>Профиль</NavLink>
//                         <NavLink to={'/poetry'}>Произведение</NavLink>
//                         <NavLink to={'/aboutUs'}>О нас</NavLink>
//                     </div>
//                     <div className={s.loginBlock}>
//                         {props.isAuth ? <div className={s.loginName}><NavLink id={s.profile} to={'/profile'}>{props.login}</NavLink> <button className={s.logout} onClick={props.logout}><center><img src={logoutIcon} /></center></button> </div>
//                             : <NavLink id={s.login} to={'/login'}>Login</NavLink>}
//                     </div>
//                     <MenuBurger {...props} />
//                 </div>
//             </div>
//         </div>
//     );
// }
// export default Header;
