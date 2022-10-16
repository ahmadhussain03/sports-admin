import {ID, Response} from '../../../../../../_metronic/helpers'
import { Role } from './../../../../auth/core/_models';

export interface UserInformationForm {
  id: number
  email: string
  user_type: string
  role?: Role
}

export type UsersQueryResponse = Response<Array<UserInformationForm>>
