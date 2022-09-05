import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {SessionsListHeader} from './components/header/SessionsListHeader'
import {SessionsTable} from './table/SessionsTable'
import {KTCard} from '../../../../../_metronic/helpers'

const SessionList = () => {
  return (
    <>
      <KTCard>
        <SessionsListHeader />
        <SessionsTable />
      </KTCard>
    </>
  )
}

const SessionListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <SessionList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {SessionListWrapper}
