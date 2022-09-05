import {ID, Response} from '../../../../../../../_metronic/helpers'
import { Team } from '../../../../team-management/teams-list/core/_models'

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
  pivot_rsvp: boolean | null,
  pivot_paid: boolean | null,
  pivot_attendance: boolean | null
}

export type PlayersResponseQuery = Response<Array<Player>>
