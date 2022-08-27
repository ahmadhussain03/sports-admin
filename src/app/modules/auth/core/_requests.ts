import axios from '../../../utils/axios'
import {AuthModel, UserModel} from './_models'
import { UserInformationForm } from './../../apps/user-management/users-information-list/core/_models';

const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/user`
export const USER_CODE_VALIDATION = `${API_URL}/user_request_verify`
export const USER_CODE_REGISTERATION = `${API_URL}/user_request_register`
export const LOGIN_URL = `${API_URL}/login`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_VERIFICATION_CODE_URL = `${API_URL}/password_forgot`
export const PASSWORD_RESET_URL = `${API_URL}/password_reset`
export const LOGOUT_URL = `${API_URL}/logout`

export interface RegisterPayload {
  name: string,
  email: string,
  username: string,
  password: string,
  password_confirmation: string,
  clubName: string,
}

export interface RegisterInformationPayload {
  name: string,
  username: string,
  password: string,
  password_confirmation: string,
  code: string,
}

export interface PasswordResetPayload {
  email: string,
  verificationCode: string,
  password: string,
  password_confirmation: string,
}

export function login(username: string, password: string) {
  return axios.post<AuthModel>(LOGIN_URL, {
    username,
    password,
  })
}

export function register(
  data: RegisterPayload
) {
  return axios.post<AuthModel>(REGISTER_URL, data)
}

export function requestPasswordVerificationCode(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_VERIFICATION_CODE_URL, {
    email,
  })
}

export function resetPassword(data: PasswordResetPayload) {
  return axios.post<{result: boolean}>(PASSWORD_RESET_URL, data)
}

export function revokeToken() {
  return axios.post(LOGOUT_URL)
}

export function getUserByToken(token: string) {
  return axios.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export function validateCode(code: string) {
  return axios.post<UserInformationForm>(USER_CODE_VALIDATION, {code})
}

export function registerInformation(data: RegisterInformationPayload) {
  return axios.post<UserModel>(USER_CODE_REGISTERATION, data)
}
