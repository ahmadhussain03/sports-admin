import { KTCard, KTSVG, toAbsoluteUrl } from "../../../../../_metronic/helpers"
import FullCalendar, { EventClickArg } from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import { useNavigate } from 'react-router-dom';
import { useUpcomingSession } from './core/_hook';

const SessionsCalendar = () => {

    const navigate = useNavigate()

    const { data, isLoading } = useUpcomingSession()

    const redirectAddSession = () => {
        navigate('/session-management/sessions/create')
    }

    const redirectToListView = () => {
        navigate('/session-management/sessions')
    }

    const handleEventClick = (event: EventClickArg) => {
        navigate('/session-management/sessions/view/' + event.event.id)
    }

    if(isLoading) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center">
                 <img
                  alt='Logo'
                  src={toAbsoluteUrl('/media/logos/default.png')}
                  className='h-350px'
                />
                Loading...
            </div>
        )
    }

    return (
        <KTCard>
            <div className="card-header border-0 pt-6">
                <div className='d-flex justify-content-between' data-kt-user-table-toolbar='base'>
                    {/* <UsersListFilter /> */}
                    <div className="card-title">
                        <h1>Upcoming Sessions</h1>
                    </div>
                    <div className="card-toolbar">
                        {/* begin::Export */}
                        <button type='button' className='btn btn-success me-3' onClick={redirectToListView}>
                            <KTSVG path='/media/icons/duotune/files/fil001.svg' className='svg-icon-2' />
                            List View
                        </button>
                        {/* end::Export */}

                        {/* begin::Add user */}
                        <button type='button' className='btn btn-primary' onClick={redirectAddSession}>
                            <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
                            Add Session
                        </button>
                        {/* end::Add user */}
                    </div>
                </div>
            </div>
            {!!data && (
                <div className="card-body">
                    <FullCalendar
                        plugins={[ dayGridPlugin ]}
                        initialView="dayGridMonth"
                        eventClick={handleEventClick}
                        events={data?.map(session => ({ title: session.name, date: session.date, id: session.id.toString() }))}
                    />
                </div>
            )}
        </KTCard>
    )
}

export default SessionsCalendar