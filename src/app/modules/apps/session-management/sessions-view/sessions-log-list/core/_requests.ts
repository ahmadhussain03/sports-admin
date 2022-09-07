import { AxiosResponse } from 'axios'
import { ID, Response } from '../../../../../../../_metronic/helpers'
import { SessionsResponseQuery } from './_models'
import axios from '../../../../../../utils/axios'

const API_URL = process.env.REACT_APP_API_URL

const SESSION_LOG_URL = `${API_URL}/session`

const getSessionLogs = (query: string, id: ID): Promise<SessionsResponseQuery> => {
  return axios
    .get(`${SESSION_LOG_URL}/${id}/logs?${query}`)
    .then((d: AxiosResponse<SessionsResponseQuery>) => d.data)
}

export { getSessionLogs }
