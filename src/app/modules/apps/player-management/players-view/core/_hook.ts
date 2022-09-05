import { useQuery } from 'react-query';
import { getPlayer } from './_request';

export function usePlayerView({ id }: { id: number | string }) {
    return useQuery(['player-view', id], () => getPlayer(id))
}