import { ID, Response } from '../../../../../../_metronic/helpers'
import { Session } from '../../../session-management/sessions-list/core/_models'
import { Team } from '../../../team-management/teams-list/core/_models'

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
  club?: Club,
  team_id?: number | null,
  team?: Team | null,
  attended_count: number,
  session_outstanding_count: number,
  payment_outstanding_count: number,
  payment_made: number,
  sessions?: Session[]
}

export type PlayersResponseQuery = Response<Array<Player>>
