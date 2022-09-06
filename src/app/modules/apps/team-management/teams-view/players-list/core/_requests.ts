import {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../../_metronic/helpers'
import {Player, PlayersResponseQuery} from './_models'
import axios from '../../../../../../utils/axios'

const API_URL = process.env.REACT_APP_API_URL

const TEAM_PLAYER_URL = `${API_URL}/team`

const getPlayers = (query: string, id: ID): Promise<PlayersResponseQuery> => {
  return axios
    .get(`${TEAM_PLAYER_URL}/${id}/player?${query}`)
    .then((d: AxiosResponse<PlayersResponseQuery>) => d.data)
}

const deletePlayer = (teamId: ID, playerId: ID): Promise<void> => {
  return axios.delete(`${TEAM_PLAYER_URL}/${teamId}/player/${playerId}`).then(() => {})
}

const assignPlayerToTeam = (teamId: ID, payload: { player: number | string }): Promise<void> => {
  return axios.post(`${TEAM_PLAYER_URL}/player/assign`, { player: payload.player, team: teamId })
}

export {getPlayers, deletePlayer, assignPlayerToTeam}
