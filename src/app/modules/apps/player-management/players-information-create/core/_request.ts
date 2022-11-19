import axios from '../../../../../utils/axios'
import { PlayerInformationForm } from '../../players-information-list/core/_models'

const API_URL = process.env.REACT_APP_API_URL

const USER_URL = `${API_URL}/new_player_request`

export interface CreatePlayerInformationPayload {
    email: string,
}

export function createUserInformation(payload: CreatePlayerInformationPayload) {
    return axios.post<PlayerInformationForm>(USER_URL, payload)
}
