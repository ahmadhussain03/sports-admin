import { useNavigate, useParams } from "react-router-dom"
import { Authorization } from "../../../../../lib/authorization"
import { KTSVG } from "../../../../../_metronic/helpers"
import { toAbsoluteUrl } from "../../../../../_metronic/helpers/AssetHelpers"
import SessionDetail from "./components/SessionDetail"
import { useSessionView } from './core/_hook'
import { PlayersListWrapper } from "./players-list/PlayersList"
import { SessionLogListWrapper } from "./sessions-log-list/SessionsLogList"

const SessionsView = () => {

  const navigation = useNavigate()
  const { id } = useParams()

  if (!id && id !== undefined) {
    navigation('/error/404')
  }

  const { data, isLoading, isError } = useSessionView({ id: id as string })

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
          <div className="col">
            <button type='button' className='btn btn-danger my-3' onClick={() => navigation(-1)} >
              <KTSVG path='/media/icons/duotune/arrows/arr002.svg' className='svg-icon-3' />
              Back
            </button>
          </div>
        </div>
      </div>
      {!!data && <SessionDetail session={data} />}
      <div className="separator my-5"></div>
      <Authorization allowedPermissions={['view-session-players']}>
        <PlayersListWrapper />
      </Authorization>
      <div className="separator my-5"></div>
      <Authorization allowedPermissions={['view-session-logs']}>
        <SessionLogListWrapper />
      </Authorization>
    </>
  )
}

export { SessionsView }
