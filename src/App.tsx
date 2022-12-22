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
import footer from "./UI/Components/Footer/Footer";

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
            <div className="app-wrapper">
                <Header/>
                <div className="app-wrapper-content">
                    <Routes>
                        <Route path='/login' element={<Footer />} />
                    </Routes>
                </div>
            </div>
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
               <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}

export default MainApp;
