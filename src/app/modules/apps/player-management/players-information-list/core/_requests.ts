import {AxiosResponse} from 'axios'
import {ID} from '../../../../../../_metronic/helpers'
import {PlayersQueryResponse} from './_models'
import axios from '../../../../../utils/axios'

const API_URL = process.env.REACT_APP_API_URL

const PLAYER_INFORMATION_FORM_URL = `${API_URL}/new_player_request`

const getPlayerInformationForms = (query: string): Promise<PlayersQueryResponse> => {
  return axios
    .get(`${PLAYER_INFORMATION_FORM_URL}?${query}`)
    .then((d: AxiosResponse<PlayersQueryResponse>) => d.data)
}

const deletePlayerInformationForm = (informationFormId: ID): Promise<void> => {
  return axios.delete(`${PLAYER_INFORMATION_FORM_URL}/${informationFormId}`).then(() => {})
}

export {getPlayerInformationForms, deletePlayerInformationForm}
