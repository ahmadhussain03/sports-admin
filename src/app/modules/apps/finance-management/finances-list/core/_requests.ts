import { AxiosResponse } from 'axios'
import { ID, Response } from '../../../../../../_metronic/helpers'
import axios from '../../../../../utils/axios'
import { PlayersResponseQuery } from '../../../player-management/players-list/core/_models'

const API_URL = process.env.REACT_APP_API_URL

const FINANCES_URL = `${API_URL}/finance`
const PAYMENT_REQUEST_URL = `${API_URL}/finance/outstanding_payment`

const getFinances = (query: string): Promise<PlayersResponseQuery> => {
  return axios
    .get(`${FINANCES_URL}?${query}`)
    .then((d: AxiosResponse<PlayersResponseQuery>) => d.data)
}

const sendOutstandingPaymentRequest = (payload: { player?: ID, team?: ID, session?: ID }) => {
  return axios.post(PAYMENT_REQUEST_URL, {}, {
    params: payload
  })
}

export { getFinances, sendOutstandingPaymentRequest }
