import { useQuery } from 'react-query';
import { getUpcomingSessions } from './_request';

export function useUpcomingSession() {
    return useQuery(['upcoming-sessions'], () => getUpcomingSessions())
}