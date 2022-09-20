import { lazy, FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { MenuTestPage } from '../pages/MenuTestPage'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import { useAuth } from '../modules/auth'

const PrivateRoutes = () => {
  const { currentUser } = useAuth()

  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
  const TeamsPage = lazy(() => import('../modules/apps/team-management/TeamsPage'))
  const PlayersPage = lazy(() => import('../modules/apps/player-management/PlayersPage'))
  const SessionsPage = lazy(() => import('../modules/apps/session-management/SessionsPage'))
  const FinancesPage = lazy(() => import('../modules/apps/finance-management/FinancesPage'))
  const UncategorizedPlayersPage = lazy(() => import('../modules/apps/uncategorized-player-management/UncategorizedPlayersPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        
        {currentUser?.user_type === 'Owner' && (
          <Route
            path='/user-management/*'
            element={
              <SuspensedView>
                <UsersPage />
              </SuspensedView>
            }
          />
        )}
        <Route
          path='/team-management/*'
          element={
            <SuspensedView>
              <TeamsPage />
            </SuspensedView>
          }
        />
        <Route
          path='/player-management/*'
          element={
            <SuspensedView>
              <PlayersPage />
            </SuspensedView>
          }
        />
        <Route
          path='/session-management/*'
          element={
            <SuspensedView>
              <SessionsPage />
            </SuspensedView>
          }
        />
        <Route
          path='/finance-management/*'
          element={
            <SuspensedView>
              <FinancesPage />
            </SuspensedView>
          }
        />
        <Route
          path='/uncategorized-player-management/*'
          element={
            <SuspensedView>
              <UncategorizedPlayersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { PrivateRoutes }
