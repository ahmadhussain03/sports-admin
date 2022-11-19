import {ID, Response} from '../../../../../../_metronic/helpers'

export interface PlayerInformationForm {
  id: number
  email: string
}

export type PlayersQueryResponse = Response<Array<PlayerInformationForm>>
