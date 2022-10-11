import { ID, Response } from '../../../../../../../_metronic/helpers'
import { User } from '../../../../user-management/users-list/core/_models'


export interface SessionLog {
  id: number
  action: string
  userId: number | null
  user: User | null,
  created_at: string
}

export type SessionsResponseQuery = Response<Array<SessionLog>>
