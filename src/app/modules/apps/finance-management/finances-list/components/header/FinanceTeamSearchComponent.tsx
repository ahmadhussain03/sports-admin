/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { initialQueryState } from '../../../../../../../_metronic/helpers'
import { useQueryRequest } from '../../core/QueryRequestProvider'
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';
import { getTeams } from '../../../../uncategorized-player-management/players-assign/core/_request';

const FinanceTeamSearchComponent = () => {
    const { updateState, state } = useQueryRequest()
    const [team, setTeam] = useState<{ label: string, value: string } | null>(null)

    useEffect(() => {
        const prevState = state

        updateState({
            filter: {},
            ...initialQueryState,
        })

        updateState({
            filter: { ...prevState.filter, team: team?.value },
            ...initialQueryState,
        })

    }, [team])

    const loadOptions: LoadOptions<{ value: string, label: string }, any, any> = async (search, loadedOptions, { page }) => {

        const response = await getTeams(search, page);

        return {
            options: response.data.data.map((data: any) => ({ value: data.id, label: `${data.name} (${data.league})` })),
            hasMore: response.data.meta.next_page_url ? true : false,
            additional: {
                page: page + 1,
            },
            ...loadedOptions
        };
    }

    return (
        <div className='card-title w-100'>
            {/* begin::Search */}
            <div className='fv-row' style={{ width: '100%' }}>
                <AsyncPaginate
                    value={team}
                    loadOptions={loadOptions}
                    onChange={value => setTeam(value)}
                    isClearable={true}
                    additional={{
                        page: 1,
                    }}
                    debounceTimeout={300}
                    placeholder="Team"
                    noOptionsMessage={() => "No Record Found!"}
                />
            </div>
            {/* end::Search */}
        </div>
    )
}

export { FinanceTeamSearchComponent }
