import {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {Player, PlayersResponseQuery} from './_models'
import axios from '../../../../../utils/axios'

const API_URL = process.env.REACT_APP_API_URL

const PLAYER_URL = `${API_URL}/uncategorized_player`

const getPlayers = (query: string): Promise<PlayersResponseQuery> => {
  return axios
    .get(`${PLAYER_URL}?${query}`)
    .then((d: AxiosResponse<PlayersResponseQuery>) => d.data)
}

export {getPlayers}
