import { useNavigate, useParams } from "react-router-dom"
import { KTSVG, toAbsoluteUrl } from "../../../../../_metronic/helpers";
import TeamsDetail from "./components/TeamsDetail";
import { useTeamView } from './core/_hook';
import { PlayersListWrapper } from "./players-list/PlayersList";
import FullCalendar, { EventClickArg } from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'

const TeamsView = () => {
  const navigation = useNavigate()
  const { id } = useParams()

  if (!id && id !== undefined) {
    navigation('/error/404')
  }

  const { data, isLoading, isError } = useTeamView({ id: id as string })

  if (isError) {
    navigation('/error/404')
  }

  const handleEventClick = (event: EventClickArg) => {
    navigation(`/session-management/sessions/view/${event.event.id}`)
  }

  if (isLoading) {
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
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <button type='button' className='btn btn-danger my-3' onClick={() => navigation(-1)} >
              <KTSVG path='/media/icons/duotune/arrows/arr002.svg' className='svg-icon-3' />
              Back
            </button>
          </div>
        </div>
      </div>
      {!!data && <TeamsDetail team={data} />}
      <div className="separator my-5"></div>
      <PlayersListWrapper />
      <div className="separator my-5"></div>
      {!!data && (
        <div className="card">
          <div className="card-body">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              eventClick={handleEventClick}
              events={data.sessions?.map(session => ({ title: session.name, date: session.date, id: session.id.toString() }))}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default TeamsView