import { ID } from '../../../../../../_metronic/helpers';
import axios from '../../../../../utils/axios'
import { Role } from './../../../../auth/core/_models';

const API_URL = process.env.REACT_APP_API_URL

const ROLES_URL = `${API_URL}/roles`

export interface UpdateRolePayload {
    name?: string,
    permissions?: number[]
}

export function updateRole(payload: UpdateRolePayload, id: ID) {
    return axios.put<Role>(`${ROLES_URL}/${id}`, payload)
}