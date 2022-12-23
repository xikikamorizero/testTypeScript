import React from "react";
import style from './Main.module.css'
import {connect} from 'react-redux'
import {AppStateType} from "../../../BLL/redux";

const Main:React.FC<MapStateToProps>=(props)=>{
    return(
        <div className={style.main}>
            <div className={style.mainContainer}>
                Main
            </div>
        </div>
    )
}

type MapStateToProps={

}

const mapStateToProps=(state:AppStateType)=>{

}

export default connect(mapStateToProps,{})(Main)