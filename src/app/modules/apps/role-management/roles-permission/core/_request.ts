import { ID } from '../../../../../../_metronic/helpers';
import axios from '../../../../../utils/axios'
import { Role } from './../../../../auth/core/_models';

const API_URL = process.env.REACT_APP_API_URL

const ROLES_URL = `${API_URL}/roles`
const PERMISSIONS_URL = `${API_URL}/permissions`

export function getRole(id: ID) {
    return axios.get<Role>(`${ROLES_URL}/${id}`)
}

export async function getPermissions() {
    const response = await axios.get<Role['permissions']>(`${PERMISSIONS_URL}`)

    const permissions: { [key: string]: Role['permissions'] } = {};
    const groups = new Set<string>()

    response.data.map(permission => groups.add(permission.group))

    Array.from(groups).forEach(group => {

        const groupPermissions = response.data.filter(permission => permission.group === group)

        permissions[group] = groupPermissions
    })

    return permissions
}