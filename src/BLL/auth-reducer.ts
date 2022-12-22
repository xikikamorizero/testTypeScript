import { ResultCodeEnum } from './../types/types';
import { InferActionTypes, BaseThunkType } from './redux';
import {FormAction, stopSubmit} from 'redux-form'
import { authAPI, securityAPI } from '../DAL/api'
import {Nullean} from "./../types/types";
import {Dispatch} from "redux";


// const SET_USER_DATA = 'auth/SET_USER_DATA';
// const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';


let initialState = {
    userId: null as Nullean<number>,
    email: null as Nullean<string>,
    login: null as Nullean<string>,
    isAuth: false,
    captchaUrl: null as Nullean<string> //if null, then captcha is not required
};

type InitialStateType = typeof initialState

const authReducer = (state = initialState, action:ActionType): InitialStateType => {
    switch (action.type) {
        case 'auth/SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            }
        case 'auth/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

const action = {
    setAuthUserData: (userId: Nullean<number>, email: Nullean<string>, login: Nullean<string>, isAuth: boolean) => ({
        type: 'auth/SET_USER_DATA',
        payload: { userId, email, login, isAuth }
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'auth/GET_CAPTCHA_URL_SUCCESS',
        payload: { captchaUrl }
    } as const)
}

type ActionType = InferActionTypes<typeof action>
export type ThunkType = BaseThunkType<ActionType | FormAction>
export type DispatchType = Dispatch<ActionType>

// export const setAuthUserData = (userId: number, email: string, login: string, isAuth: boolean) => {
//     return {
//         type: SET_USER_DATA,
//         payload: { userId, email, login, isAuth }
//     }
// }

// export const getCaptchaUrlSuccess = (captchaUrl: string) => {
//     return {
//         type: GET_CAPTCHA_URL_SUCCESS,
//         payload: { captchaUrl }
//     }
// }

export const getAuthUserData = ():ThunkType => async (dispatch) => {
    let response = await authAPI.me();
    if (response.resultCode === ResultCodeEnum.Success) {
        let { id, login, email } = response.data;
        dispatch(action.setAuthUserData(id, email, login, true));
    }
}

export const login = (email:string, password:string, rememberMe:boolean, captcha:string):ThunkType => async (dispatch) => {
  let response = await authAPI.login(email, password, rememberMe, captcha);

  if (response.data.resultCode === 0) {
    dispatch(getAuthUserData())
  }
  else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }

    let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some Error";
    dispatch(stopSubmit("login", { _error: message }));
  }
}



export const logout = ():ThunkType => async (dispatch) => {
    let response = await authAPI.logout()

    if (response.data.resultCode === 0) {
        dispatch(action.setAuthUserData(null, null, null, false));
    }
}

export const getCaptchaUrl = ():ThunkType => async (dispatch) => {
    let response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url;
    dispatch(action.getCaptchaUrlSuccess(captchaUrl))
}


export default authReducer;