import {ID, Response} from '../../../../../../_metronic/helpers'

export interface Club {
  id: number
  name: string
}

export interface Player {
  id: number
  first_name: string
  last_name: string
  email: string
  address: string
  phone_number: string
  post_code: string
  notes?: string | null
  club?: Club
}

export type PlayersResponseQuery = Response<Array<Player>>
