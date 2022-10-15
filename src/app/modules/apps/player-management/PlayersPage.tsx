import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {PlayersCreate} from './teams-create/PlayersCreate'
import { PlayersEdit } from './teams-edit/PlayersEdit'
import {PlayersListWrapper} from './players-list/PlayersList'
import { PlayersView } from './players-view/PlayersView'
import { Authorization, AuthorizationFallback } from './../../../../lib/authorization';

const playersBreadcrumbs: Array<PageLink> = [
  {
    title: 'Player Management',
    path: '/player-management/players',
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
              <Authorization allowedPermissions={['view-player']} forbiddenFallback={<AuthorizationFallback />}>
                <PageTitle breadcrumbs={playersBreadcrumbs}>Players List</PageTitle>
                <PlayersListWrapper />
              </Authorization>
            </>
          }
        />
        <Route
          path='players/create'
          element={
            <>
              <Authorization allowedPermissions={['create-player']} forbiddenFallback={<AuthorizationFallback />}>
                <PageTitle breadcrumbs={playersBreadcrumbs}>Create Player</PageTitle>
                <PlayersCreate />
              </Authorization>
            </>
          }
        />
        <Route
          path='players/edit/:id'
          element={
            <>
              <Authorization allowedPermissions={['update-player']} forbiddenFallback={<AuthorizationFallback />}>
                <PageTitle breadcrumbs={playersBreadcrumbs}>Edit Player</PageTitle>
                <PlayersEdit />
              </Authorization>
            </>
          }
        />
        <Route
          path='players/view/:id'
          element={
            <>
              <Authorization allowedPermissions={['view-player']} forbiddenFallback={<AuthorizationFallback />}>
                <PageTitle breadcrumbs={playersBreadcrumbs}>Player View</PageTitle>
                <PlayersView />
              </Authorization>
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/player-management/players' />} />
      <Route path='*' element={<Navigate to='/error/404' />} />
    </Routes>
  )
}

export default PlayersPage
