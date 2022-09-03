import {useListView} from '../../core/ListViewProvider'
import {PlayerListToolbar} from './PlayerListToolbar'
import {UsersListGrouping} from './UsersListGrouping'
import {PlayersListSearchComponent} from './PlayersListSearchComponent'

const UsersListHeader = () => {
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <PlayersListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? <UsersListGrouping /> : <PlayerListToolbar />}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {UsersListHeader}
