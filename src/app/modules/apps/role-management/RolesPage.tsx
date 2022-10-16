import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import { Authorization, AuthorizationFallback } from '../../../../lib/authorization'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import { RolesCreate } from './roles-create/RolesCreate'
import { RolesEdit } from './roles-edit/RolesEdit'
import { RolesListWrapper } from './roles-list/RolesList'
import { RolesPermission } from './roles-permission/RolesPermission'

const rolesBreadcrumbs: Array<PageLink> = [
  {
    title: 'Role Management',
    path: '/role-management/roles',
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

const RolesPages = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path='roles'
          element={
            <>
              <Authorization allowedPermissions={['view-role']} forbiddenFallback={<AuthorizationFallback />}>
                <PageTitle breadcrumbs={rolesBreadcrumbs}>Roles list</PageTitle>
                <RolesListWrapper />
              </Authorization>
            </>
          }
        />
        <Route
          path='roles/create'
          element={
            <>
              <Authorization allowedPermissions={['create-role']} forbiddenFallback={<AuthorizationFallback />}>
                <PageTitle breadcrumbs={rolesBreadcrumbs}>Create Role</PageTitle>
                <RolesCreate />
              </Authorization>
            </>
          }
        />
        <Route
          path='roles/edit/:id'
          element={
            <>
              <Authorization allowedPermissions={['update-role']} forbiddenFallback={<AuthorizationFallback />}>
                <PageTitle breadcrumbs={rolesBreadcrumbs}>Roles list</PageTitle>
                <RolesEdit />
              </Authorization>
            </>
          }
        />
         <Route
          path='roles/permissions/:id'
          element={
            <>
              <Authorization allowedPermissions={['view-role']} forbiddenFallback={<AuthorizationFallback />}>
                <PageTitle breadcrumbs={rolesBreadcrumbs}>Role Permissions</PageTitle>
                <RolesPermission />
              </Authorization>
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to='/role-management/roles' />} />
      <Route path='*' element={<Navigate to='/error/404' />} />
    </Routes>
  )
}

export default RolesPages
