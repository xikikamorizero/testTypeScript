import React from "react";
import {Navigate} from 'react-router-dom';
import {connect, useSelector} from 'react-redux';
import {AppStateType} from "../../BLL/redux";
import {MapStateToProps} from "react-redux/es/exports";


let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
});
type MapStateToPropsType = {
    isAuth: boolean
}

type MapStateToPropsTypeApp = {
    initialized: boolean
}
type MapDispatchToPropsType = {
    initializeApp: () => void
}

type Doc = MapStateToPropsTypeApp & MapDispatchToPropsType

export const withAuthRedirect = (Component: React.ComponentType<Doc>) => {

    const RedirectComponent = (props: MapStateToPropsType & Doc) => {
        return (<>
                {!props.isAuth ? <Navigate to={'/login'}/> : <Component {...props} />}
            </>
        )
    }

    let ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectedAuthRedirectComponent;
}