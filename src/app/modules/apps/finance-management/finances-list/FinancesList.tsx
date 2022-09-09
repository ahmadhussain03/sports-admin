import { ListViewProvider } from './core/ListViewProvider'
import { QueryRequestProvider } from './core/QueryRequestProvider'
import { QueryResponseProvider } from './core/QueryResponseProvider'
import { UsersListHeader } from './components/header/UsersListHeader'
import { FinancesTable } from './table/FinancesTable'
import { KTCard } from '../../../../../_metronic/helpers'

const FinancesList = () => {
  return (
    <>
      <KTCard>
        <UsersListHeader />
        <FinancesTable />
      </KTCard>
    </>
  )
}

const FinancesListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <FinancesList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export { FinancesListWrapper }
