import {InferActionTypes} from "./redux";

let initionState={
    num: 13,
    str: 'sdsd'
}
type InitialStateType  = typeof initionState

const AboutReducer =(state=initionState, action:ActionType)=>{
    switch(action.type){
        case "dsds": return {...state}
        default: return state
    }
}

const action={
    TestAction:()=>({
        type:"dsds"
    }as const)
}

type ActionType = InferActionTypes<typeof action>

export default  AboutReducer;