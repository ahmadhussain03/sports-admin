import axios from '../../../../../utils/axios'
import { Player } from '../../players-list/core/_models';
import { CreatePlayerPayload } from './../../teams-create/core/_request';

const API_URL = process.env.REACT_APP_API_URL

const PLAYER_URL = `${API_URL}/player`

export function updatePlayer(payload: Partial<CreatePlayerPayload>, id: number) {
    return axios.put<Player>(`${PLAYER_URL}/${id}`, payload)
}
