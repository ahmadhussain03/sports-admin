import {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {Team, TeamsQueryResponse} from './_models'
import axios from '../../../../../utils/axios'

const API_URL = process.env.REACT_APP_API_URL

const TEAM_URL = `${API_URL}/team`

const getTeams = (query: string): Promise<TeamsQueryResponse> => {
  return axios
    .get(`${TEAM_URL}?${query}`)
    .then((d: AxiosResponse<TeamsQueryResponse>) => d.data)
}

const deleteTeam = (teamId: ID): Promise<void> => {
  return axios.delete(`${TEAM_URL}/${teamId}`).then(() => {})
}

export {getTeams, deleteTeam}
