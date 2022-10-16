import { useQuery } from 'react-query';
import { getGoogleRedirect, getGeneralRoles } from './_requests';

export function useGoogleRedirect() {
    return useQuery(['google-redirect'], () => getGoogleRedirect(), { staleTime: Infinity })
}

export function useGeneralRoles() {
    return useQuery(['general-roles'], () => getGeneralRoles(), { staleTime: Infinity })
}