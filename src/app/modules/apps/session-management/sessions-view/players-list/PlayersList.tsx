import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {UsersListHeader} from './components/header/UsersListHeader'
import {PlayersTable} from './table/PlayersTable'
import {KTCard} from '../../../../../../_metronic/helpers'

const PlayersList = () => {
  return (
    <>
      <KTCard>
        <UsersListHeader />
        <PlayersTable />
      </KTCard>
    </>
  )
}

const PlayersListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <PlayersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {PlayersListWrapper}
