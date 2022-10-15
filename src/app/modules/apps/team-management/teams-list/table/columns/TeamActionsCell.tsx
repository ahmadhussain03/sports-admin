/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {MenuComponent} from '../../../../../../../_metronic/assets/ts/components'
import {ID, KTSVG, QUERIES} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deleteTeam} from '../../core/_requests'
import { useNavigate } from 'react-router-dom';
import { Team } from '../../core/_models'
import { Authorization } from '../../../../../../../lib/authorization'

type Props = {
  id: ID,
  team: Team
}

const TeamActionsCell: FC<Props> = ({id, team}) => {
  const {setItemIdForUpdate} = useListView()
  const navigation = useNavigate()
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()

  useEffect(() => {
    MenuComponent.reinitialization()
  }, [])

  const redirectEditPage = () => {
    navigation('/team-management/teams/edit/' + id, {
      state: team
    })
  }

  const deleteItem = useMutation(() => deleteTeam(id), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.TEAM_LIST}-${query}`])
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
        {/* begin::Menu item */}
        <Authorization allowedPermissions={['update-team']}>
          <div className='menu-item px-3'>
            <a className='menu-link px-3' onClick={redirectEditPage}>
              Edit
            </a>
          </div>
        </Authorization>
        {/* end::Menu item */}

        {/* begin::Menu item */}
        <Authorization allowedPermissions={['delete-team']}>
          <div className='menu-item px-3'>
            <a
              className='menu-link px-3'
              data-kt-users-table-filter='delete_row'
              onClick={async () => await deleteItem.mutateAsync()}
            >
              Delete
            </a>
          </div>
        </Authorization>
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  )
}

export {TeamActionsCell}
