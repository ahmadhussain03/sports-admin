import { SessionLogsSearchComponent } from './SessionLogsListSearchComponent'

const SessionsListHeader = () => {
  return (
    <div className='card-header border-0 pt-6 flex-column d-flex'>
      <h1 className='my-5'>Session Logs</h1>
      <div className='d-flex justify-content-between'>
        <SessionLogsSearchComponent />
      </div>
    </div>
  )
}

export { SessionsListHeader }
