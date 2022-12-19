import { Action } from 'redux'
import { applyMiddleware, combineReducers, createStore, compose} from "redux";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import profileReducer from './profile-reducer';

let Rootreducer = combineReducers({
    profile: profileReducer
});

type RootReducerType = typeof Rootreducer;
export type AppStateType = ReturnType<RootReducerType>

type PropetiesType<T> = T extends{[key:string]:infer U}? U:never
export type InferActionTypes<T extends{[key:string]:(...args:any[])=>any}>= ReturnType<PropetiesType<T>>

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(Rootreducer, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;