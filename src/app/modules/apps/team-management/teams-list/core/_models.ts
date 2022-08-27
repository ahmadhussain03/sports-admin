import {ID, Response} from '../../../../../../_metronic/helpers'

export interface Club {
  id: number
  name: string
}

export interface Team {
  id: number
  name: string
  league: string
  notes: string
  club_id: number
  club?: Club
}

export type TeamsQueryResponse = Response<Array<Team>>
