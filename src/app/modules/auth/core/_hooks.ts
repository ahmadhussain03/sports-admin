import { useQuery } from 'react-query';
import { getGoogleRedirect } from './_requests';

export function useGoogleRedirect() {
    return useQuery(['google-redirect'], () => getGoogleRedirect(), { staleTime: Infinity })
}