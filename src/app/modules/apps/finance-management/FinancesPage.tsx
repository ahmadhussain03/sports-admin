import { Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { PageLink, PageTitle } from '../../../../_metronic/layout/core'
import { FinancesListWrapper } from './finances-list/FinancesList'

const financesBreadcrumbs: Array<PageLink> = [
    {
        title: 'Finance Management',
        path: '/finance-management/finances',
        isSeparator: false,
        isActive: false,
    },
    {
        title: '',
        path: '',
        isSeparator: true,
        isActive: false,
    },
]

const FinancesPage = () => {
    return (
        <Routes>
            <Route element={<Outlet />}>
                <Route
                    path='finances'
                    element={
                        <>
                            <PageTitle breadcrumbs={financesBreadcrumbs}>Finances</PageTitle>
                            <FinancesListWrapper />
                        </>
                    }
                />
            </Route>
            <Route index element={<Navigate to='/finance-management/finances' />} />
            <Route path='*' element={<Navigate to='/error/404' />} />
        </Routes>
    )
}

export default FinancesPage
