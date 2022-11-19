import {PlayersListToolbar} from './PlayerListToolbar'
import {PlayersListSearchComponent} from './PlayersListSearchComponent'

const PlayersInformationFormListHeader = () => {
  return (
    <div className='card-header border-0 pt-6'>
      <PlayersListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        <PlayersListToolbar />
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {PlayersInformationFormListHeader}
