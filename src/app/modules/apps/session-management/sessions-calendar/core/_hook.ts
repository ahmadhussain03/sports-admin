import { useQuery } from 'react-query';
import { getUpcomingSessions } from './_request';
import { useAuthorization } from './../../../../../../lib/authorization';

export function useUpcomingSession() {

    const { can } = useAuthorization()

    return useQuery(['upcoming-sessions'], () => getUpcomingSessions(), {
        enabled: can({ allowedPermissions: ['view-session'] })
    })
}