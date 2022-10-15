import { FinanceTeamSearchComponent } from './FinanceTeamSearchComponent'
import { FinancePlayerSearchComponent } from './FinancePlayerSearchComponent'
import { FinanceSessionSearchComponent } from './FinanceSessionSearchComponent'
import { PlayerListToolbar } from './PlayerListToolbar'
import { Authorization } from './../../../../../../../lib/authorization';

const UsersListHeader = () => {
  return (
    <div className='card-header border-0 pt-6'>
      {/* <PlayersListSearchComponent /> */}
      <FinanceTeamSearchComponent />
      <FinancePlayerSearchComponent />
      <FinanceSessionSearchComponent />
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        <Authorization allowedPermissions={['send-outstanding-payment-request']}>
          <PlayerListToolbar />
        </Authorization>
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export { UsersListHeader }
