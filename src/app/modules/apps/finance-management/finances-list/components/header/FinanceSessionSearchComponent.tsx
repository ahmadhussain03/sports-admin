/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { initialQueryState } from '../../../../../../../_metronic/helpers'
import { useQueryRequest } from '../../core/QueryRequestProvider'
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';
import { getAllSessions } from '../../../../uncategorized-player-management/players-assign/core/_request';

const FinanceSessionSearchComponent = () => {
    const { updateState, state } = useQueryRequest()
    const [session, setSession] = useState<{ label: string, value: string } | null>(null)
    useEffect(() => {
        const prevState = state

        updateState({
            filter: {},
            ...initialQueryState,
        })

        updateState({
            filter: { ...prevState.filter, session: session?.value },
            ...initialQueryState,
        })
    }, [session])

    const loadOptions: LoadOptions<{ value: string, label: string }, any, any> = async (search, loadedOptions, { page }) => {

        const response = await getAllSessions(search, page);

        return {
            options: response.data.data.map((data: any) => ({ value: data.id, label: data.name })),
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
                    value={session}
                    loadOptions={loadOptions}
                    onChange={value => setSession(value)}
                    isClearable={true}
                    additional={{
                        page: 1,
                    }}
                    debounceTimeout={300}
                    placeholder="Session"
                    noOptionsMessage={() => "No Record Found!"}
                />
            </div>
            {/* end::Search */}
        </div>
    )
}

export { FinanceSessionSearchComponent }
