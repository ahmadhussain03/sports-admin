/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {MenuComponent} from '../../../../../../../_metronic/assets/ts/components'
import {ID, KTSVG, QUERIES} from '../../../../../../../_metronic/helpers'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import { useNavigate } from 'react-router-dom';
import { Authorization } from '../../../../../../../lib/authorization'
import { Role } from './../../../../../auth/core/_models';
import { deleteRole } from '../../core/_requests'

type Props = {
  id: ID,
  role: Role
}

const RoleActionsCell: FC<Props> = ({id, role}) => {
  const navigation = useNavigate()
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const redirectEditPage = () => {
    navigation('/role-management/roles/edit/' + id, {
      state: role
    })
  }

  const redirectPermissionPage = () => {
    navigation('/role-management/roles/permissions/' + id, {
      state: role
    })
  }

  const deleteItem = useMutation(() => deleteRole(id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.ROLES_LIST}-${query}`])
    },
  })

  return (
    <>
      <a
        href='#'
        className='btn btn-light btn-active-light-primary btn-sm'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        Actions
        <KTSVG path='/media/icons/duotune/arrows/arr072.svg' className='svg-icon-5 m-0' />
      </a>
      {/* begin::Menu */}
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
        data-kt-menu='true'
      >
        {/*  */}
        {/* begin::Menu item */}
        <Authorization allowedPermissions={['view-role']}>
            <div className='menu-item px-3'>
              <a className='menu-link px-3' onClick={redirectPermissionPage}>
                Permissions
              </a>
            </div>
        </Authorization>
        {/* end::Menu item */}
        {/* begin::Menu item */}
        {!!role.club_id && (
          <Authorization allowedPermissions={['update-role']}>
            <div className='menu-item px-3'>
              <a className='menu-link px-3' onClick={redirectEditPage}>
                Edit
              </a>
            </div>
          </Authorization>
        )}
        {/* end::Menu item */}
        {/* begin::Menu item */}
        {!!role.club_id && (
          <Authorization allowedPermissions={['delete-role']}>
            <div className='menu-item px-3'>
              <a className='menu-link px-3' onClick={async () => await deleteItem.mutateAsync()}>
                Delete
              </a>
            </div>
          </Authorization>
        )}
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  )
}

export {RoleActionsCell}
