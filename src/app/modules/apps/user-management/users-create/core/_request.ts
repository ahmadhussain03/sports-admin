import axios from '../../../../../utils/axios'
import {User} from '../../users-list/core/_models'

const API_URL = process.env.REACT_APP_API_URL

const USER_URL = `${API_URL}/users`
const ROLES_URL = `${API_URL}/roles`

export interface CreateUserPayload {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    password_confirmation: string,
    role: string,
}

export function createUser(payload: CreateUserPayload) {
    return axios.post<User>(USER_URL, payload)
}

export function getRoles(search: string, page: string) {
    return axios.get(ROLES_URL, {
        params: { search: search, current_page: page }
    })
}
