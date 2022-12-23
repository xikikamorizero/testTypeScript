import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {Provider} from "react-redux";
import store, {AppStateType} from "./BLL/redux";
import Header from "./UI/Components/Header/Header";
import {connect} from 'react-redux'
import {initializeApp} from "./BLL/app-reducer";
import Footer from "./UI/Components/Footer/Footer";
import {compose} from 'redux'
import {withAuthRedirect} from "./UI/Hoc/withAuthRedirect";
import Login from "./UI/Components/Login/Login";

const App: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    useEffect(() => {
        props.initializeApp()
    }, [])
    if (!props.initialized) {
        return (
            <div>Загрузка....</div>
        )
    }
    return (
        <div className="App">
            <Header/>
            <div className="app-wrapper-content">
                <Routes>
                    <Route path='/' element={''} />
                    <Route path='/login' element={<Login/>}/>
                </Routes>
            </div>
            <Footer/>
        </div>
    );
}

type MapStateToPropsType = {
    initialized: boolean
}
type MapDispatchToPropsType = {
    initializeApp: () => void
}


const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose(
    connect(mapStateToProps, {initializeApp}),
    withAuthRedirect
)(App)

const MainApp = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    )
}

export default MainApp;
