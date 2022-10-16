import { useQuery } from 'react-query';
import { ID } from '../../../../../../_metronic/helpers';
import { getPermissions, getRole } from './_request';

export function useRoleView({ id }: { id: ID }) {
    return useQuery(['session-view', id], () => getRole(id))
}

export function usePermission() {
    return useQuery(['all-permissions'], () => getPermissions(), { staleTime: Infinity })
}