import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import { Authorization, AuthorizationFallback } from '../../../../lib/authorization'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import SessionsCalendar from './sessions-calendar/SessionsCalendar'
import {SessionsCreate} from './sessions-create/SessionsCreate'
import { SessionsEdit } from './sessions-edit/SessionsEdit'
import {SessionListWrapper} from './sessions-list/SessionsList'
import { SessionsView } from './sessions-view/SessionsView'

const sessionsBreadcrumbs: Array<PageLink> = [
  {
    title: 'Session Management',
    path: '/session-management/sessions',
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

const SessionsPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='sessions'
          element={
            <>
              <Authorization allowedPermissions={['view-session']} forbiddenFallback={<AuthorizationFallback />}>
                <PageTitle breadcrumbs={sessionsBreadcrumbs}>Sessions List</PageTitle>
                <SessionListWrapper />
              </Authorization>
            </>
          }
        />
        <Route
          path='sessions/calendar'
          element={
            <>
             <Authorization allowedPermissions={['view-session']} forbiddenFallback={<AuthorizationFallback />}>
                <PageTitle breadcrumbs={sessionsBreadcrumbs}>Sessions Calendar</PageTitle>
                <SessionsCalendar />
              </Authorization>
            </>
          }
        />
        <Route
          path='sessions/create'
          element={
            <>
              <Authorization allowedPermissions={['create-session']} forbiddenFallback={<AuthorizationFallback />}>
                <PageTitle breadcrumbs={sessionsBreadcrumbs}>Create Session</PageTitle>
                <SessionsCreate />
              </Authorization>
            </>
          }
        />
        <Route
          path='sessions/edit/:id'
          element={
            <>
              <Authorization allowedPermissions={['update-session']} forbiddenFallback={<AuthorizationFallback />}>
                <PageTitle breadcrumbs={sessionsBreadcrumbs}>Edit Session</PageTitle>
                <SessionsEdit />
              </Authorization>
            </>
          }
        />
         <Route
          path='sessions/view/:id'
          element={
            <>
              <Authorization allowedPermissions={['view-session']} forbiddenFallback={<AuthorizationFallback />}>
                <PageTitle breadcrumbs={sessionsBreadcrumbs}>Session Detail</PageTitle>
                <SessionsView />
              </Authorization>
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/session-management/sessions' />} />
      <Route path='*' element={<Navigate to='/error/404' />} />
    </Routes>
  )
}

export default SessionsPage
