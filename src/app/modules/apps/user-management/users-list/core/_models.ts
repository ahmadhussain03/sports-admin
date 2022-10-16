import {ID, Response} from '../../../../../../_metronic/helpers'
import { UserModel } from '../../../../auth'

export interface Club {
  id: number
  name: string
}

export interface User extends UserModel {}

export type UsersQueryResponse = Response<Array<User>>
