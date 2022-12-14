import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import { Authorization, AuthorizationFallback } from '../../../../lib/authorization'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import { PlayersAssign } from './players-assign/PlayersAssign'
import {PlayersListWrapper} from './players-list/PlayersList'

const playersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Uncategorized Player Management',
    path: '/uncategorized-player-management/players',
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

const PlayersPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='players'
          element={
            <>
              <Authorization allowedPermissions={['view-uncategorized-player']} forbiddenFallback={<AuthorizationFallback />}>
                <PageTitle breadcrumbs={playersBreadcrumbs}>Uncategorized Players List</PageTitle>
                <PlayersListWrapper />
              </Authorization>
            </>
          }
        />
        <Route
          path='players/assign'
          element={
            <>
              <Authorization allowedPermissions={['update-player']} forbiddenFallback={<AuthorizationFallback />}>
                <PageTitle breadcrumbs={playersBreadcrumbs}>Assign Player</PageTitle>
                <PlayersAssign />
              </Authorization>
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/uncategorized-player-management/players' />} />
      <Route path='*' element={<Navigate to='/error/404' />} />
    </Routes>
  )
}

export default PlayersPage
