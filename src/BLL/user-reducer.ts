import {ResultCodeEnum, UserType} from './../types/types';
import {usersAPI} from '../DAL/api';
import {BaseThunkType, InferActionTypes} from "./redux";
import {Dispatch} from "redux";
import {updateObjectInArray} from "../types/objectHelper";


const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 9,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
};

type InitialStateType = typeof initialState

const userReducer = (state = initialState, action:ActionType): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            }
        case SET_USERS: {
            return { ...state, users: action.users }
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count }
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state;
    }
}

const action = {
    followSuccess: (userId:number) => ({
        type: FOLLOW,
        userId
    }as const),
    unfollowSuccess: (userId:number) => ({
        type: UNFOLLOW,
        userId
    }as const),
    setUsers: (users:Array<UserType>) => ({
        type: SET_USERS,
        users
    }as const),
    setCurrentPage: (currentPage:number) => ({
        type: SET_CURRENT_PAGE,
        currentPage
    }as const),
    setTotalUsersCount: (totalUsersCount:number) => ({
        type: SET_TOTAL_USERS_COUNT,
        count: totalUsersCount
    }as const),
    toggleIsFetching: (isFetching:boolean) => ({
        type: TOGGLE_IS_FETCHING,
        isFetching
    }as const),

    toggleFollowingProgress: (isFetching:boolean, userId:number) => ({
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        isFetching,
        userId
    }as const)
}
// export const followSuccess = (userId:number) => {
//     return {
//         type: FOLLOW,
//         userId
//     }
// }
//
// export const unfollowSuccess = (userId:number) => {
//     return {
//         type: UNFOLLOW,
//         userId
//     }
// }
// export const setUsers = (users:Array<UserType>) => {
//     return {
//         type: SET_USERS,
//         users
//     }
// }
// export const setCurrentPage = (currentPage:number) => {
//     return {
//         type: SET_CURRENT_PAGE,
//         currentPage
//     }
// }
// export const setTotalUsersCount = (totalUsersCount:number) => {
//     return {
//         type: SET_TOTAL_USERS_COUNT,
//         count: totalUsersCount
//     }
// }
// export const toggleIsFetching = (isFetching:boolean) => {
//     return {
//         type: TOGGLE_IS_FETCHING,
//         isFetching
//     }
// }
//
// export const toggleFollowingProgress = (isFetching:boolean, userId:number) => {
//     return {
//         type: TOGGLE_IS_FOLLOWING_PROGRESS,
//         isFetching,
//         userId
//     }
// }

export const getUsers = (currentPage:number, pageSize:number):ThunkType => {
    return async (dispatch) => {
        dispatch(action.toggleIsFetching(true));
        dispatch(action.setCurrentPage(currentPage));

        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(action.toggleIsFetching(false));
        dispatch(action.setUsers(data.items));
        dispatch(action.setTotalUsersCount(data.totalCount));
    }
}

const followUnfollowFlow = async (dispatch:Dispatch<ActionType>, userId:number, apiMethod:any, actionCreator:(userId:number)=>ActionType) => {
    dispatch(action.toggleFollowingProgress(true, userId));
    let data = await apiMethod(userId)

    if (data.resultCode === ResultCodeEnum.Success) {
        dispatch(actionCreator(userId));
    }
    dispatch(action.toggleFollowingProgress(false, userId));
}

export const follow = (userId:number):ThunkType => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), action.followSuccess);
    }
}

export const unfollow = (userId:number):ThunkType => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), action.unfollowSuccess);
    }
}

export default userReducer;

type ActionType = InferActionTypes<typeof action>
type ThunkType = BaseThunkType<ActionType>