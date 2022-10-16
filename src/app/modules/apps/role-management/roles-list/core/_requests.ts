import {AxiosResponse} from 'axios'
import {RolesQueryResponse} from './_models'
import axios from '../../../../../utils/axios'
import { ID } from '../../../../../../_metronic/helpers'

const API_URL = process.env.REACT_APP_API_URL

const ROLE_URL = `${API_URL}/roles`

const getRoles = (query: string): Promise<RolesQueryResponse> => {
  return axios
    .get(`${ROLE_URL}?${query}`)
    .then((d: AxiosResponse<RolesQueryResponse>) => d.data)
}

const deleteRole = (id: ID): Promise<void> => {
  return axios.delete(`${ROLE_URL}/${id}`).then(() => {})
}

export {getRoles, deleteRole}
