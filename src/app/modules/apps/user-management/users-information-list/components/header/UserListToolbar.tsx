import {KTSVG} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {UsersListFilter} from './UsersListFilter'
import { useNavigate } from 'react-router-dom';
import { Authorization } from '../../../../../../../lib/authorization';

const UsersListToolbar = () => {
  const navigation = useNavigate()

  const redirectAddUser = () => {
    navigation('/user-management/users/information-form/create')
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
      <Authorization allowedPermissions={['create-user-information-form']}>
        <button type='button' className='btn btn-primary' onClick={redirectAddUser}>
          <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
          Add User Information Form
        </button>
      </Authorization>
      {/* end::Add user */}
    </div>
  )
}

export {UsersListToolbar}
