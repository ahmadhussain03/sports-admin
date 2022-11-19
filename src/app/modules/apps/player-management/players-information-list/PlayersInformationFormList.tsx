import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {PlayersInformationFormListHeader} from './components/header/PlayersInformationFormListHeader'
import {PlayersInformationFormTable} from './table/UsersInformationFormTable'
import {KTCard} from '../../../../../_metronic/helpers'

const PlayersInformationFormList = () => {
  return (
    <>
      <KTCard>
        <PlayersInformationFormListHeader />
        <PlayersInformationFormTable />
      </KTCard>
    </>
  )
}

const PlayersInformationFormListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <PlayersInformationFormList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {PlayersInformationFormListWrapper}
