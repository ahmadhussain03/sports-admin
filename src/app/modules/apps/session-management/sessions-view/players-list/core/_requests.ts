import {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../../_metronic/helpers'
import {Player, PlayersResponseQuery} from './_models'
import axios from '../../../../../../utils/axios'

const API_URL = process.env.REACT_APP_API_URL

const SESSION_PLAYER_URL = `${API_URL}/session`

const getPlayers = (query: string, id: ID): Promise<PlayersResponseQuery> => {
  return axios
    .get(`${SESSION_PLAYER_URL}/${id}/players?${query}`)
    .then((d: AxiosResponse<PlayersResponseQuery>) => d.data)
}

const deletePlayer = (sessionId: ID, playerId: ID): Promise<void> => {
  return axios.delete(`${SESSION_PLAYER_URL}/${sessionId}/players/${playerId}`).then(() => {})
}

const assignPlayerToSession = (sessionId: ID, payload: { player: number | string }): Promise<void> => {
  return axios.post(`${SESSION_PLAYER_URL}/${sessionId}/players`, payload)
}

const markPaidSession = (sessionId: ID, playerId: ID, payload: { paid: boolean }): Promise<void> => {
  return axios.put(`${SESSION_PLAYER_URL}/${sessionId}/players/${playerId}`, payload)
}

export {getPlayers, deletePlayer, assignPlayerToSession, markPaidSession}
