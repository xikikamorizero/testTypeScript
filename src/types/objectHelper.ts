import {PhotosType, UserType} from "./types";

export const updateObjectInArray =(items:Array<UserType>, itemId:number, objPropName:objectPropNameType, newobjProps:{followed: boolean})=>{
    return items.map( u=> {
        if (u[objPropName] === itemId) {
            return {
                ...u,
                ...newobjProps
            };
        }
        return u;
    })
}

type objectPropNameType='id'|'name'|'status'|'photos'
