import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import { Authorization, AuthorizationFallback } from '../../../../lib/authorization'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {TeamsCreate} from './teams-create/TeamsCreate'
import { TeamsEdit } from './teams-edit/TeamsEdit'
import {TeamsListWrapper} from './teams-list/TeamsList'
import TeamsView from './teams-view/TeamsView';

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
              <Authorization allowedPermissions={['view-team']} forbiddenFallback={<AuthorizationFallback />}>
                <PageTitle breadcrumbs={teamsBreadcrumb}>Teams List</PageTitle>
                <TeamsListWrapper />
              </Authorization>
            </>
          }
        />
        <Route
          path='teams/create'
          element={
            <>
              <Authorization allowedPermissions={['create-team']} forbiddenFallback={<AuthorizationFallback />}>
                <PageTitle breadcrumbs={teamsBreadcrumb}>Create Team</PageTitle>
                <TeamsCreate />
              </Authorization>
            </>
          }
        />
        <Route
          path='teams/edit/:id'
          element={
            <>
              <Authorization allowedPermissions={['update-team']} forbiddenFallback={<AuthorizationFallback />}>
                <PageTitle breadcrumbs={teamsBreadcrumb}>Edit Team</PageTitle>
                <TeamsEdit />
              </Authorization>
            </>
          }
        />
         <Route
          path='teams/view/:id'
          element={
            <>
              <Authorization allowedPermissions={['view-team']} forbiddenFallback={<AuthorizationFallback />}>
                <PageTitle breadcrumbs={teamsBreadcrumb}>Team Detail</PageTitle>
                <TeamsView />
              </Authorization>
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
