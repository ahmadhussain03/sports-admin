import {KTSVG} from '../../../../../../../_metronic/helpers'
import { useNavigate } from 'react-router-dom';
import { Authorization } from '../../../../../../../lib/authorization';

const RolesListToolbar = () => {
  const navigation = useNavigate()

  const redirectAddRole = () => {
    navigation('/role-management/roles/create')
  }

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>

      {/* begin::Add user */}
      <Authorization allowedPermissions={['create-role']}>
        <button type='button' className='btn btn-primary' onClick={redirectAddRole}>
          <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
          Add Role
        </button>
      </Authorization>
      {/* end::Add user */}
    </div>
  )
}

export {RolesListToolbar}
