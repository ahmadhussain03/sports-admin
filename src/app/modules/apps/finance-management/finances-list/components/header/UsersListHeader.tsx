import { FinanceTeamSearchComponent } from './FinanceTeamSearchComponent'
import { FinancePlayerSearchComponent } from './FinancePlayerSearchComponent'
import { FinanceSessionSearchComponent } from './FinanceSessionSearchComponent'
import { PlayerListToolbar } from './PlayerListToolbar'

const UsersListHeader = () => {
  return (
    <div className='card-header border-0 pt-6'>
      {/* <PlayersListSearchComponent /> */}
      <FinanceTeamSearchComponent />
      <FinancePlayerSearchComponent />
      <FinanceSessionSearchComponent />
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        <PlayerListToolbar />
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export { UsersListHeader }
