import axios from '../../../../../utils/axios'
import { Session } from '../../sessions-list/core/_models';
import { CreateSessionPayload } from './../../sessions-create/core/_request';

const API_URL = process.env.REACT_APP_API_URL

const SESSION_URL = `${API_URL}/session`

export function updateSession(payload: Partial<CreateSessionPayload>, id: number) {
    return axios.put<Session>(`${SESSION_URL}/${id}`, payload)
}
