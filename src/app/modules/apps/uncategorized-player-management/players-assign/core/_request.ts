import axios from '../../../../../utils/axios'
import { Player } from '../../players-list/core/_models'

const API_URL = process.env.REACT_APP_API_URL

const UNCATEGORIZED_PLAYER_URL = `${API_URL}/uncategorized_player`
const PLAYER_ASSIGN_URL = `${API_URL}/team/player/assign`
const TEAM_URL = `${API_URL}/team`

export interface PlayerAssignPayload {
    team: string,
    player: string,
}

export function assignPlayer(payload: PlayerAssignPayload) {
    return axios.post(PLAYER_ASSIGN_URL, payload)
}

export function getUncategorizedPlayers(search: string, page: string) {
    return axios.get(UNCATEGORIZED_PLAYER_URL, {
        params: { search: search, current_page: page }
    })
}

export function getTeams(search: string, page: string) {
    return axios.get(TEAM_URL, {
        params: { search: search, current_page: page }
    })
}
