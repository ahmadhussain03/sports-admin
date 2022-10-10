import {Session} from '../../sessions-list/core/_models'
import ShowMoreText from 'react-show-more-text'

interface ISessionDetail {
  session: Session
}

const SessionDetail: React.FC<ISessionDetail> = ({session}) => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='card card-custom col me-4'>
          <div className='card-body'>
            <div className='d-flex flex-column'>
              <h1>Session Detail</h1>
              <div className='d-flex flex-column my-4'>
                <p className='fs-5 m-0'>Session Name</p>
                <h3 className='m-0'>{session.name}</h3>
              </div>
              <div className='d-flex flex-column my-4'>
                <p className='fs-5 m-0'>Session Type</p>
                <h3 className='m-0'>{session.type}</h3>
              </div>
              <div className='d-flex flex-column my-4'>
                <p className='fs-5 m-0'>Session Date</p>
                <h3 className='m-0'>{session.date}</h3>
              </div>
              <div className='d-flex flex-column my-4'>
                <p className='fs-5 m-0'>Session Location</p>
                <h3 className='m-0'>{session.location}</h3>
              </div>
              <div className='d-flex flex-column my-4'>
                <p className='fs-5 m-0'>Session Price</p>
                <h3 className='m-0'>{session.price}</h3>
              </div>
              {!!session.notes && (
                <div className='d-flex flex-column my-4'>
                  <p className='fs-5 m-0'>Notes</p>
                  <h3>
                    <ShowMoreText
                      lines={4}
                      more='Show more'
                      less='Show less'
                      className='content-css'
                      anchorClass='my-anchor-css-class'
                      expanded={false}
                      truncatedEndingComponent={'... '}
                    >
                      {session.notes}
                    </ShowMoreText>
                  </h3>
                </div>
              )}
              <div className='d-flex flex-column my-4'>
                <p className='fs-5 m-0'>Teams</p>
                <div className='d-flex flex-column'>
                  {session?.teams.map((team) => (
                    <li className='d-flex align-items-center py-2' key={team.id}>
                      <span className='bullet h-5px w-10px me-5'></span>
                      <h3 className='m-0'>
                        {team.name} ({team.league})
                      </h3>
                    </li>
                  ))}
                </div>
              </div>
              <div className='d-flex flex-column my-4'>
                <a
                  href={`https://wa.me/?text=http://admin.squadstm.co.uk/request/session?session=${session.id}`}
                  data-action='share/whatsapp/share'
                  target='_blank'
                  className='btn btn-outline-success mt-2' rel="noreferrer"
                >
                  Share Link to Whatsapp
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className='card card-custom col me-4'>
          <div className='card-body'>
            <div className='d-flex flex-column'>
              <h1>Financial Details</h1>
              <div className='d-flex flex-column my-4'>
                <p className='fs-5 m-0'>Cost of Session</p>
                <h3 className='m-0'>{session.price}</h3>
              </div>
              <div className='d-flex flex-column my-4'>
                <p className='fs-5 m-0'># Players in Session</p>
                <h3 className='m-0'>{session.player_count}</h3>
              </div>
              <div className='d-flex flex-column my-4'>
                <p className='fs-5 m-0'># Players Paid</p>
                <h3 className='m-0'>{session.player_count - session.player_unpaid_count}</h3>
              </div>
              <div className='d-flex flex-column my-4'>
                <p className='fs-5 m-0'># Players Un-Paid</p>
                <h3 className='m-0'>{session.player_unpaid_count}</h3>
              </div>
               <div className='d-flex flex-column my-4'>
                <p className='fs-5 m-0'># Players Responded</p>
                <h3 className='m-0'>{session.player_responded_count}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SessionDetail
