import {KTSVG} from '../../../../../../../_metronic/helpers'
import { useNavigate } from 'react-router-dom';
import { Authorization } from './../../../../../../../lib/authorization';

const TeamListToolbar = () => {
  const navigation = useNavigate()

  const redirectAddTeam = () => {
    navigation('/team-management/teams/create')
  }

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {/* <UsersListFilter /> */}

      {/* begin::Export */}
      {/* <button type='button' className='btn btn-light-primary me-3'>
        <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
        Export
      </button> */}
      {/* end::Export */}

      {/* begin::Add user */}
      <Authorization allowedPermissions={['create-team']}>
        <button type='button' className='btn btn-primary' onClick={redirectAddTeam}>
          <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
          Add Team
        </button>
      </Authorization>
      {/* end::Add user */}
    </div>
  )
}

export {TeamListToolbar}
