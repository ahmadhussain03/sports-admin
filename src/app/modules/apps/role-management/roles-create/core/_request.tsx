import axios from '../../../../../utils/axios'
import { Role } from './../../../../auth/core/_models';

const API_URL = process.env.REACT_APP_API_URL

const ROLES_URL = `${API_URL}/roles`

export interface CreateUserPayload {
    name: string,
}

export function createRole(payload: CreateUserPayload) {
    return axios.post<Role>(ROLES_URL, payload)
}