import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {UsersInformationFormListHeader} from './components/header/UsersInformationFormListHeader'
import {UsersInformationFormTable} from './table/UsersInformationFormTable'
import {KTCard} from '../../../../../_metronic/helpers'

const UsersInformationFormList = () => {
  return (
    <>
      <KTCard>
        <UsersInformationFormListHeader />
        <UsersInformationFormTable />
      </KTCard>
    </>
  )
}

const UsersInformationFormListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <UsersInformationFormList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {UsersInformationFormListWrapper}
