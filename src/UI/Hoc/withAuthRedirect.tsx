import React from "react";
import {Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {AppStateType} from "../../BLL/redux";


let mapStateToPropsForRedirect =(state:AppStateType)=>({
    isAuth: state.auth.isAuth
});
type MapStateToPropsType={
    isAuth:boolean
}


export const withAuthRedirect=(Component:React.FC<any>)=>{

    const RedirectComponent =(props:MapStateToPropsType)=>{
        return(<>
            {!props.isAuth? <Navigate to={'/login'} /> : <Component {...props} />}
        </>
    )
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectedAuthRedirectComponent;
}