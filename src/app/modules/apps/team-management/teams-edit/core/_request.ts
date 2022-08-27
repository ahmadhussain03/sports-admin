import axios from '../../../../../utils/axios'
import { Team } from '../../teams-list/core/_models';
import { CreateTeamPayload } from './../../teams-create/core/_request';

const API_URL = process.env.REACT_APP_API_URL

const TEAM_URL = `${API_URL}/team`

export function updateTeam(payload: Partial<CreateTeamPayload>, id: number) {
    return axios.put<Team>(`${TEAM_URL}/${id}`, payload)
}
