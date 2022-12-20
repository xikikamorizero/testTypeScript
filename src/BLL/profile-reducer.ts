import { InferActionTypes, BaseThunkType } from './redux';
import {Nullean, PhotosType, ProfileType} from './../types/types';
import {FormAction, stopSubmit} from 'redux-form';
import {profileAPI} from '../DAL/api'


const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

type Post = {
    id:number
    message: string
    likecount: number
}

const action = {
    addPostActionCreater: (newPostBody:string) => ({
            type: ADD_POST,
            newPostBody
    }as const),
    setStatus: (status:string) => ({
            type: SET_STATUS,
            status  
    }as const),
    deletePost : (postId:number) => ({
            type: DELETE_POST,
            postId
    }as const),
    savePhotoSuccess : (photos:PhotosType) => ({
            type: SAVE_PHOTO_SUCCESS,
            photos
    }as const),
    setUserProfile: (profile:ProfileType) => ({
            type: SET_USER_PROFILE,
            profile
    }as const)
}

type ActionType = InferActionTypes<typeof action>
type ThunkType = BaseThunkType<ActionType | FormAction>

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you', likecount: 15 },
        { id: 2, message: "It's my first post", likecount: 20 }
    ] as Array<Post>,
    profile: null as Nullean<ProfileType>,
    status: "" ,
    newPostText: ''
};

type InitialStateType = typeof initialState 

const profileReducer = (state = initialState, action:ActionType):InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.newPostBody,
                likecount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId)
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos }as ProfileType

            }
        default:
            return state;
    }

}

// export const addPostActionCreater = (newPostBody:string) => {
//     return {
//         type: ADD_POST,
//         newPostBody
//     }
// }
// export const setStatus = (status:string) => {
//     return {
//         type: SET_STATUS,
//         status
//     }
// }
// export const deletePost = (postId:number) => {
//     return {
//         type: DELETE_POST,
//         postId
//     }
// }

// export const savePhotoSuccess = (photos:PhotosType) => {
//     return {
//         type: SAVE_PHOTO_SUCCESS,
//         photos
//     }
// }
// export const setUserProfile = (profile:ProfileType) => {
//     return {
//         type: SET_USER_PROFILE,
//         profile
//     }
// }
export const getUserProfile = (userId:number):ThunkType => async (dispatch) => {
    let response = await profileAPI.getProfile(userId);
    dispatch(action.setUserProfile(response));
}

export const getStatus = (userId:number):ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(action.setStatus(response.data));
}

export const updateStatus = (status:string):ThunkType => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);

    if (response.data.resultCode === 0) {
        dispatch(action.setStatus(status));
    }
}
export const savePhoto = (file:File):ThunkType => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);

    if (response.data.resultCode === 0) {
        dispatch(action.savePhotoSuccess(response.data.data.photos));
    }
}
export const saveProfile = (profile:ProfileType):ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    let response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === 0) {
        if(userId!=null){
        dispatch(getUserProfile(userId));
        } else{
            throw new Error("userId can be null")
        }
    }
    else {
        dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }));
        return (Promise.reject(response.data.messages[0]));
    }
}

export default profileReducer;