import {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {Player, PlayersResponseQuery} from './_models'
import axios from '../../../../../utils/axios'

const API_URL = process.env.REACT_APP_API_URL

const PLAYER_URL = `${API_URL}/player`

const getPlayers = (query: string): Promise<PlayersResponseQuery> => {
  return axios
    .get(`${PLAYER_URL}?${query}`)
    .then((d: AxiosResponse<PlayersResponseQuery>) => d.data)
}

const deletePlayer = (playerId: ID): Promise<void> => {
  return axios.delete(`${PLAYER_URL}/${playerId}`).then(() => {})
}

const importPlayers = (file: File) => {

  const formData = new FormData()
  formData.append('report', file)

  return axios.post(`player_import`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export {getPlayers, deletePlayer, importPlayers}
