import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {TeamsCreate} from './teams-create/TeamsCreate'
import { TeamsEdit } from './teams-edit/TeamsEdit'
import {TeamsListWrapper} from './teams-list/TeamsList'

const teamsBreadcrumb: Array<PageLink> = [
  {
    title: 'Team Management',
    path: '/team-management/teams',
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

const TeamsPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='teams'
          element={
            <>
              <PageTitle breadcrumbs={teamsBreadcrumb}>Teams List</PageTitle>
              <TeamsListWrapper />
            </>
          }
        />
        <Route
          path='teams/create'
          element={
            <>
              <PageTitle breadcrumbs={teamsBreadcrumb}>Create Team</PageTitle>
              <TeamsCreate />
            </>
          }
        />
        <Route
          path='teams/edit/:id'
          element={
            <>
              <PageTitle breadcrumbs={teamsBreadcrumb}>Edit Team</PageTitle>
              <TeamsEdit />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/team-management/teams' />} />
      <Route path='*' element={<Navigate to='/error/404' />} />
    </Routes>
  )
}

export default TeamsPage
