import {ID, Response} from '../../../../../../_metronic/helpers'
import { Player } from '../../../player-management/players-list/core/_models'
import { Team } from '../../../team-management/teams-list/core/_models'

export interface Club {
  id: number
  name: string
}

export interface Session {
  id: number
  name: string
  type: string
  date: string
  location: string
  notes?: string
  price: number
  teams: Team[]
  players?: Player[],
  player_count: number,
  player_unpaid_count: number,
  player_responded_count: number
}

export type SessionsResponseQuery = Response<Array<Session>>
