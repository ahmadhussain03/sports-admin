import axios from '../../../../../utils/axios'
import { Session } from '../../sessions-list/core/_models'

const API_URL = process.env.REACT_APP_API_URL

const SESSION_URL = `${API_URL}/session`

export interface CreateSessionPayload {
    name: string,
    type: string,
    location: string,
    date: string,
    price: string | number,
    notes?: string | null,
    teams: number[] | string[]
    players?: number[] | string[]
}

export function createSession(payload: CreateSessionPayload) {
    return axios.post<Session>(SESSION_URL, payload)
}
