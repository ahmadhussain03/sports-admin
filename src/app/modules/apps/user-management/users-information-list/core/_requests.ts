import {AxiosResponse} from 'axios'
import {ID} from '../../../../../../_metronic/helpers'
import {UsersQueryResponse} from './_models'
import axios from '../../../../../utils/axios'

const API_URL = process.env.REACT_APP_API_URL

const USER_INFORMATION_FORM_URL = `${API_URL}/user_request`

const getUserInformationForms = (query: string): Promise<UsersQueryResponse> => {
  return axios
    .get(`${USER_INFORMATION_FORM_URL}?${query}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const deleteUserInformationForm = (informationFormId: ID): Promise<void> => {
  return axios.delete(`${USER_INFORMATION_FORM_URL}/${informationFormId}`).then(() => {})
}

export {getUserInformationForms, deleteUserInformationForm}
