import {useListView} from '../../core/ListViewProvider'
import {PlayerListToolbar} from './PlayerListToolbar'
import {UsersListGrouping} from './UsersListGrouping'
import {PlayersListSearchComponent} from './PlayersListSearchComponent'

const UsersListHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6 flex-column d-flex'>
      <h1 className='my-5'>Session Players</h1>
      <div className='d-flex justify-content-between'>
        <PlayersListSearchComponent />
        {/* begin::Card toolbar */}
        <div className='card-toolbar'>
          {/* begin::Group actions */}
          {selected.length > 0 ? <UsersListGrouping /> : <PlayerListToolbar />}
          {/* end::Group actions */}
        </div>
        {/* end::Card toolbar */}
      </div>
    </div>
  )
}

export {UsersListHeader}
