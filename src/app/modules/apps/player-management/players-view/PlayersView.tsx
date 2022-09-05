import { useNavigate, useParams } from "react-router-dom"
import { KTSVG } from "../../../../../_metronic/helpers"
import { toAbsoluteUrl } from "../../../../../_metronic/helpers/AssetHelpers"
import PlayerDetail from "./components/PlayerDetail"
import { usePlayerView } from './core/_hook'
import FullCalendar, { EventClickArg } from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'

const PlayersView = () => {

  const navigation = useNavigate()  
  const { id } = useParams()

  if(!id && id !== undefined) {
    navigation('/error/404')
  }

  const { data, isLoading, isError } = usePlayerView({ id: id as string })

  const handleEventClick = (event: EventClickArg) => {
    navigation('/session-management/sessions/view/' + event.event.id)
  }

  if(isError) {
    navigation('/error/404')
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
        {!!data && <PlayerDetail player={data} />}
        <div className="separator my-5"></div>
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Sessions</h1>
                    <div className="card">
                        <div className="card-body">
                            <FullCalendar
                                plugins={[ dayGridPlugin ]}
                                initialView="dayGridMonth"
                                eventClick={handleEventClick}
                                events={data?.sessions?.map(session => ({ title: session.name, date: session.date, id: session.id.toString() }))}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export {PlayersView}
