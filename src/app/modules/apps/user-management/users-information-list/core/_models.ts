import {ID, Response} from '../../../../../../_metronic/helpers'

export interface UserInformationForm {
  id: number
  email: string
  user_type: string
}

export type UsersQueryResponse = Response<Array<UserInformationForm>>
