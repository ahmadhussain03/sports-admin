import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import { Authorization, AuthorizationFallback } from '../../../../lib/authorization'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import { UserApprovalsWrapper } from './user-approval-list/UserApprovalsList'
import {UsersCreate} from './users-create/UsersCreate'
import { UsersEdit } from './users-edit/UsersEdit'
import { UsersInformationCreate } from './users-information-create/UsersInfromationCreate'
import { UsersInformationFormListWrapper } from './users-information-list/UsersInformationFormList'
import {UsersListWrapper} from './users-list/UsersList'

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: 'User Management',
    path: '/user-management/users',
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

const UsersPage = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='users'
          element={
            <>
              <Authorization allowedPermissions={['view-user']} forbiddenFallback={<AuthorizationFallback />}>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Users list</PageTitle>
                <UsersListWrapper />
              </Authorization>
            </>
          }
        />
        <Route
          path='users/create'
          element={
            <>
              <Authorization allowedPermissions={['create-user']} forbiddenFallback={<AuthorizationFallback /> }>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Create Users</PageTitle>
                <UsersCreate />
              </Authorization>
            </>
          }
        />
         <Route
          path='users/edit/:id'
          element={
            <>
              <Authorization allowedPermissions={['update-user']} forbiddenFallback={<AuthorizationFallback />}>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Edit User</PageTitle>
                <UsersEdit />
              </Authorization>
            </>
          }
        />
        <Route
          path='users/information-form'
          element={
            <>
              <Authorization allowedPermissions={['view-user-information-form']} forbiddenFallback={<AuthorizationFallback />}>
                <PageTitle breadcrumbs={usersBreadcrumbs}>User Information Forms</PageTitle>
                <UsersInformationFormListWrapper />
              </Authorization>
            </>
          }
        />
         <Route
          path='users/approval'
          element={
            <>
              <Authorization allowedPermissions={['view-user-request']} forbiddenFallback={<AuthorizationFallback />}>
                <PageTitle breadcrumbs={usersBreadcrumbs}>User Approvals</PageTitle>
                <UserApprovalsWrapper />
              </Authorization>
            </>
          }
        />
         <Route
          path='users/information-form/create'
          element={
            <>
              <Authorization allowedPermissions={['create-user-information-form']} forbiddenFallback={<AuthorizationFallback />}>
                <PageTitle breadcrumbs={usersBreadcrumbs}>Create Users Information Forms</PageTitle>
                <UsersInformationCreate />
              </Authorization>
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/user-management/users' />} />
      <Route path='*' element={<Navigate to='/error/404' />} />
    </Routes>
  )
}

export default UsersPage
