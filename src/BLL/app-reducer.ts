import { getAuthUserData } from "./auth-reducer"
import {BaseThunkType, InferActionTypes} from "./redux";
import {authAPI} from "../DAL/api";
import {ResultCodeEnum} from "../types/types";
import {Dispatch} from "redux";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';


let initialState = {
    initialized: false
};

type InitialStateType = typeof initialState

const appReducer = (state = initialState, action:ActionType):InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

type ActionType = InferActionTypes<typeof action>
type ThunkType = BaseThunkType<ActionType, void>
type DispatchType = Dispatch<ActionType>

const action = {
    initializedSuccess : () => ({
            type: INITIALIZED_SUCCESS
    }as const)
}

export const initializedSuccess = () => {
    return {
        type: INITIALIZED_SUCCESS
    }
}

export const initializeApp = ():ThunkType =>
    (dispatch) => {
        let promise = dispatch(getAuthUserData());
        Promise.all([promise]).then(() => {
            dispatch(action.initializedSuccess());
        });
    }

export default appReducer;