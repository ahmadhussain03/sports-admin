import {Route, Routes, Outlet, Navigate} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
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
              <PageTitle breadcrumbs={usersBreadcrumbs}>Users list</PageTitle>
              <UsersListWrapper />
            </>
          }
        />
        <Route
          path='users/create'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Create Users</PageTitle>
              <UsersCreate />
            </>
          }
        />
         <Route
          path='users/edit/:id'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Edit User</PageTitle>
              <UsersEdit />
            </>
          }
        />
        <Route
          path='users/information-form'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>User Information Forms</PageTitle>
              <UsersInformationFormListWrapper />
            </>
          }
        />
         <Route
          path='users/information-form/create'
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Create Users Information Forms</PageTitle>
              <UsersInformationCreate />
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
