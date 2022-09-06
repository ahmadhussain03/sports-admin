import { ID, Response } from '../../../../../../_metronic/helpers'
import { Session } from '../../../session-management/sessions-list/core/_models'

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
  club?: Club,
  players_count: number,
  game_count: number,
  training_count: number,
  sessions?: Session[],
  session_attended_count: number,
  session_outstanding_count: number,
  outstanding_payment: number
}

export type TeamsQueryResponse = Response<Array<Team>>
