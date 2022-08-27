import axios from '../../../../../utils/axios'
import { Team } from '../../teams-list/core/_models'

const API_URL = process.env.REACT_APP_API_URL

const TEAM_URL = `${API_URL}/team`

export interface CreateTeamPayload {
    name: string,
    league: string,
    notes: string,
}

export function createTeam(payload: CreateTeamPayload) {
    return axios.post<Team>(TEAM_URL, payload)
}
