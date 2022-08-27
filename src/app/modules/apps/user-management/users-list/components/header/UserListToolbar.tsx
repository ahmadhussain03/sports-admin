import {KTSVG} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {UsersListFilter} from './UsersListFilter'
import { useNavigate } from 'react-router-dom';

const UsersListToolbar = () => {
  const {setItemIdForUpdate} = useListView()
  const navigation = useNavigate()

  const redirectAddUser = () => {
    navigation('/user-management/users/create')
  }

  const redirectUserInformationForm = () => {
    navigation('/user-management/users/information-form')
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
       <button type='button' className='btn btn-success me-3' onClick={redirectUserInformationForm}>
        <KTSVG path='/media/icons/duotune/files/fil001.svg' className='svg-icon-2' />
        User Information Form
      </button>
      {/* end::Add user */}

      {/* begin::Add user */}
      <button type='button' className='btn btn-primary' onClick={redirectAddUser}>
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Add User
      </button>
      {/* end::Add user */}
    </div>
  )
}

export {UsersListToolbar}
