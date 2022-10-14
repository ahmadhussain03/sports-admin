import {ID, Response} from '../../../../../../_metronic/helpers'

export interface Club {
  id: number
  name: string
}

export interface User {
  id: number
  username: string
  password: string | undefined
  email: string
  first_name: string
  last_name: string
  user_type: string
  email_verified_at: string | null
  club_id: number
  club?: Club
}

export type UsersQueryResponse = Response<Array<User>>
