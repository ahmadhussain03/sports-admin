import { useQuery } from 'react-query';
import { getSession } from './_request';

export function useSessionView({ id }: { id: number | string }) {
    return useQuery(['session-view', id], () => getSession(id))
}