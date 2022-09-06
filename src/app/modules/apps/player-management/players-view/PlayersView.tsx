import { useNavigate, useParams } from "react-router-dom"
import { KTSVG } from "../../../../../_metronic/helpers"
import { toAbsoluteUrl } from "../../../../../_metronic/helpers/AssetHelpers"
import PlayerDetail from "./components/PlayerDetail"
import { usePlayerView } from './core/_hook'
import FullCalendar, { EventClickArg } from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import { useState } from "react"
import { toast } from 'react-toastify';
import { sendPlayerInformationFormRequest } from "./core/_request"

const PlayersView = () => {

  const navigation = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)

  if (!id && id !== undefined) {
    navigation('/error/404')
  }

  const playerId = id as string

  const { data, isLoading, isError } = usePlayerView({ id: playerId })

  const handleEventClick = (event: EventClickArg) => {
    navigation('/session-management/sessions/view/' + event.event.id)
  }

  const sendPlayerInfromationForm = async () => {
    try {
      setLoading(true)
      await sendPlayerInformationFormRequest({ player: playerId })
      toast.success('Infromation Update Form Sent.')
    } catch (e: any) {
      toast.error('Something Went Wrong.')
    } finally {
      setLoading(false)
    }
  }

  if (isError) {
    navigation('/error/404')
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
          <div className="col d-flex items-center flex-col my-3">
            <button type='button' className='btn btn-danger' onClick={() => navigation(-1)} >
              <KTSVG path='/media/icons/duotune/arrows/arr002.svg' className='svg-icon-3' />
              Back
            </button>
            <button
              type='button'
              onClick={sendPlayerInfromationForm}
              className='btn btn-primary mx-2 fs-7'
              disabled={loading}
            >
              {!loading && <span className='indicator-label'>Request Information Update</span>}
              {loading && (
                <span className='indicator-progress' style={{ display: 'block' }}>
                  Please wait...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
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
                  plugins={[dayGridPlugin]}
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

export { PlayersView }
