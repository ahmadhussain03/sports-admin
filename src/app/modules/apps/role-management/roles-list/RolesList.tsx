import {ListViewProvider} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {RolesListHeader} from './components/header/RolesListHeader'
import {RolesTable} from './table/RolesTable'
import {KTCard} from '../../../../../_metronic/helpers'

const RolesList = () => {
  return (
    <>
      <KTCard>
        <RolesListHeader />
        <RolesTable />
      </KTCard>
    </>
  )
}

const RolesListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <RolesList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {RolesListWrapper}
