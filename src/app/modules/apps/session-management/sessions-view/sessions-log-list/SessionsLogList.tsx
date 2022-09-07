import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {SessionsListHeader} from './components/header/SessionsListHeader'
import {SessionsLogTable} from './table/SessionsLogTable'
import {KTCard} from '../../../../../../_metronic/helpers'

const SessionLogList = () => {
  return (
    <>
      <KTCard>
        <SessionsListHeader />
        <SessionsLogTable />
      </KTCard>
    </>
  )
}

const SessionLogListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <SessionLogList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {SessionLogListWrapper}
