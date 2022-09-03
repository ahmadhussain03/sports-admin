import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {PlayersCreate} from './teams-create/PlayersCreate'
import { PlayersEdit } from './teams-edit/PlayersEdit'
import {PlayersListWrapper} from './players-list/PlayersList'

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
              <PageTitle breadcrumbs={playersBreadcrumbs}>Players List</PageTitle>
              <PlayersListWrapper />
            </>
          }
        />
        <Route
          path='players/create'
          element={
            <>
              <PageTitle breadcrumbs={playersBreadcrumbs}>Create Player</PageTitle>
              <PlayersCreate />
            </>
          }
        />
        <Route
          path='players/edit/:id'
          element={
            <>
              <PageTitle breadcrumbs={playersBreadcrumbs}>Edit Player</PageTitle>
              <PlayersEdit />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/player-management/players' />} />
      {/* <Route path='*' element={<Navigate to='/error/404' />} /> */}
    </Routes>
  )
}

export default PlayersPage
