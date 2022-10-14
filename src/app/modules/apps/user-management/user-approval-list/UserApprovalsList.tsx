import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {UsersListHeader} from './components/header/UsersListHeader'
import {UsersTable} from './table/UsersTable'
import {KTCard} from '../../../../../_metronic/helpers'

const UserApprovals = () => {
  return (
    <>
      <KTCard>
        <UsersListHeader />
        <UsersTable />
      </KTCard>
    </>
  )
}

const UserApprovalsWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <UserApprovals />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {UserApprovalsWrapper}
