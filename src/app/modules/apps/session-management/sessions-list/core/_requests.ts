import {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {SessionsResponseQuery} from './_models'
import axios from '../../../../../utils/axios'

const API_URL = process.env.REACT_APP_API_URL

const SESSION_URL = `${API_URL}/session`

const getSessions = (query: string): Promise<SessionsResponseQuery> => {
  return axios
    .get(`${SESSION_URL}?${query}`)
    .then((d: AxiosResponse<SessionsResponseQuery>) => d.data)
}

const deletePlayer = (playerId: ID): Promise<void> => {
  return axios.delete(`${SESSION_URL}/${playerId}`).then(() => {})
}

export {getSessions, deletePlayer}
