import axios from '../../../utils/axios'
import { AuthModel, UserModel } from './_models'

const API_URL = process.env.REACT_APP_API_URL

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/user`
export const LOGIN_URL = `${API_URL}/login`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_VERIFICATION_CODE_URL = `${API_URL}/password_forgot`
export const PASSWORD_RESET_URL = `${API_URL}/password_reset`
export const LOGOUT_URL = `${API_URL}/logout`

export interface RegisterPayload {
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  password: string,
  password_confirmation: string,
  clubName: string,
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
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_VERIFICATION_CODE_URL, {
    email,
  })
}

export function resetPassword(data: PasswordResetPayload) {
  return axios.post<{ result: boolean }>(PASSWORD_RESET_URL, data)
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
