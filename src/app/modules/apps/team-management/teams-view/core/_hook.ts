import { useQuery } from 'react-query';
import { ID } from '../../../../../../_metronic/helpers';
import { getTeam } from './_request';

export function useTeamView({ id }: { id: ID }) {
    return useQuery(['team-view', id], () => getTeam(id))
}