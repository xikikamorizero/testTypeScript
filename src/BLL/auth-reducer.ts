import { ResultCodeEnum } from './../types/types';
import { InferActionTypes, BaseThunkType } from './redux';
// import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from '../DAL/api'
import {Nullean} from "./../types/types";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';


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
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case GET_CAPTCHA_URL_SUCCESS:
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
        type: SET_USER_DATA,
        payload: { userId, email, login, isAuth }
    } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: { captchaUrl }
    } as const)
}

type ActionType = InferActionTypes<typeof action>
type ThunkType = BaseThunkType<ActionType>

export const setAuthUserData = (userId: number, email: string, login: string, isAuth: boolean) => {
    return {
        type: SET_USER_DATA,
        payload: { userId, email, login, isAuth }
    }
}

export const getCaptchaUrlSuccess = (captchaUrl: string) => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS,
        payload: { captchaUrl }
    }
}

export const getAuthUserData = ():ThunkType => async (dispatch) => {
    let response = await authAPI.me();
    if (response.resultCode === ResultCodeEnum.Success) {
        let { id, login, email } = response.data;
        dispatch(action.setAuthUserData(id, email, login, true));
    }
}

// export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
//   let response = await authAPI.login(email, password, rememberMe, captcha);

//   if (response.data.resultCode === 0) {
//     dispatch(getAuthUserData())
//   }
//   else {
//     if (response.data.resultCode === 10) {
//       dispatch(getCaptchaUrl());
//     }

//     let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some Error";
//     dispatch(stopSubmit("login", { _error: message }));
//   }
// }

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