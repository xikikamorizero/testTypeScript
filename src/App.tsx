import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./BLL/redux";
import Header from "./UI/Components/Header/Header";

function App() {
  return (
    <div className="App">
      <div>
        <Header />
      </div>
    </div>
  );
}

const MainApp=()=>{
  return(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
  )
}

export default MainApp;
