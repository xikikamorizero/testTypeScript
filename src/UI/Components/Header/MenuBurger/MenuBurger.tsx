import React from "react";
import s from "./MenuBurger.module.css";
import {useState} from "react";
import {NavLink} from "react-router-dom";
import {MapStateToPropsType, MapDispatchToPropsType} from "../Header";

const MenuBurger:React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {

    let [menuMode, setMenuMode] = useState(false);
    const editBurger = () => {
        setMenuMode(!menuMode)
    }
    return (
        <div className={s.mainBurger}>
            <div className={s.burger}>
                <div className={s.headerBurger} onClick={editBurger}>
        <span>
            </span>
                </div>
            </div>
            <div className={menuMode ? s.activeMenu : s.menuBurger}>
                <div className={s.menuT}>
                    <div className={s.menuBurgerOff} onClick={editBurger}>
                    </div>
                    {props.isAuth ? <div className={s.loginB}><NavLink id={s.profileB}
                                                                       onClick={
                                                                           editBurger
                                                                       } to={'/profile'}>
                        {props.login}</NavLink></div> : null}
                </div>
                <div className={s.menuP}>
                    <div className={s.blockM}>
                        <NavLink onClick={editBurger} to={'/'}>Главная</NavLink>
                    </div>
                    <div className={s.blockM}>
                        <NavLink onClick={editBurger} to={'/users'}>Пользователи</NavLink>
                    </div>
                    <div className={s.blockM}>
                        <NavLink onClick={editBurger} to={'/profile'}>Профиль</NavLink>
                    </div>
                    <div className={s.blockM}>
                        <NavLink onClick={editBurger} to={'/poetry'}>Произведение</NavLink>
                    </div>
                    <div className={s.blockM}>
                        <NavLink onClick={editBurger} to={'/aboutUs'}>О нас</NavLink>
                    </div>
                    {props.isAuth ?
                        <div className={s.blockM}><a id={s.logout} onClick={props.logout}>Выход</a></div> : null}
                </div>
            </div>
        </div>
    )

}


export default MenuBurger;