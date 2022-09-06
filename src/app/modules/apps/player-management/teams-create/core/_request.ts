import axios from '../../../../../utils/axios'
import { Player } from '../../players-list/core/_models'

const API_URL = process.env.REACT_APP_API_URL

const PLAYER_URL = `${API_URL}/player`

export interface CreatePlayerPayload {
    firstName: string,
    lastName: string,
    email: string,
    address?: string | null,
    postCode?: string | null,
    phoneNumber: string,
    notes?: string | null,
    team?: number | string | null
}

export function createPlayer(payload: CreatePlayerPayload) {
    return axios.post<Player>(PLAYER_URL, payload)
}
