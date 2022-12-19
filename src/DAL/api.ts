import { ResponseType, ResultCodeEnum, ResultCodeForCaptcha1, UserType } from './../types/types';
import axios from 'axios';
import { ProfileType } from '../types/types';

type MeResponseType = {
  id: number
  email: string
  login: string
}
type GetUserType = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}
type LoginResponseDataType = {
  userId: number
}

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "api-key": "cbb08552-8d52-4916-81d9-2cb2be6c4bc6"
  }
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get<GetUserType>(`users?page=${currentPage}&count=${pageSize}`)
      .then(response => { return response.data });
  },
  follow(userId: number) {
    return instance.post<ResponseType>(`follow/${userId}`, {})
  },
  unfollow(userId: number) {
    return instance.delete<ResponseType>(`follow/${userId}`)
  }
}

export const authAPI = {
  me() {
    return instance.get<ResponseType<MeResponseType>>(`auth/me`)
      .then(response => { return response.data })
  },
  login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
    return instance.post<ResponseType<LoginResponseDataType, ResultCodeEnum | ResultCodeForCaptcha1>>(`auth/login`, { email, password, rememberMe, captcha })
  },
  logout() {
    return instance.delete<ResponseType>(`auth/login`)
  },
}

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security\get-captcha-url`)
      .then(response => { return response.data })
  }
}

export const profileAPI = {

  getProfile(profileId: number) {
    return instance.get<ProfileType>(`profile/` + profileId)
      .then(response => { return response.data })
  },
  getStatus(profileId: number) {
    return instance.get<string>(`profile/status/` + profileId)
  },
  updateStatus(status: string) {
    return instance.put('profile/status', { status: status })

  },
  savePhoto(photoFile: any) {
    var formData = new FormData();
    formData.append("image", photoFile);
    return instance.put('profile/photo', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
  },
  saveProfile(profile: ProfileType) {
    return instance.put('profile', profile)
  }
}

authAPI.me().then(res => res.data) 