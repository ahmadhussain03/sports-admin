import axios from '../../../../../utils/axios'
import {UserInformationForm} from '../../users-information-list/core/_models'

const API_URL = process.env.REACT_APP_API_URL

const USER_URL = `${API_URL}/user_request`

export interface CreateUserInformationPayload {
    email: string,
    role: string,
}

export function createUserInformation(payload: CreateUserInformationPayload) {
    return axios.post<UserInformationForm>(USER_URL, payload)
}
