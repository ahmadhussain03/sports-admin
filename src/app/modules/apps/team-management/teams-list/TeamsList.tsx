import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {UsersListHeader} from './components/header/UsersListHeader'
import {TeamsTable} from './table/TeamsTable'
import {KTCard} from '../../../../../_metronic/helpers'

const TeamsList = () => {
  return (
    <>
      <KTCard>
        <UsersListHeader />
        <TeamsTable />
      </KTCard>
    </>
  )
}

const TeamsListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <TeamsList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {TeamsListWrapper}
