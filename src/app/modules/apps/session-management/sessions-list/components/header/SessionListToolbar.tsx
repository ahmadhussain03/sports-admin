import {KTSVG} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {UsersListFilter} from './UsersListFilter'
import { useNavigate } from 'react-router-dom';
import { Authorization } from '../../../../../../../lib/authorization';

const PlayerListToolbar = () => {
  const navigation = useNavigate()

  const redirectAddSession = () => {
    navigation('/session-management/sessions/create')
  }

  const redirectToCalenderView = () => {
    navigation('/session-management/sessions/calendar')
  }

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {/* <UsersListFilter /> */}

      {/* begin::Export */}
      <button type='button' className='btn btn-success me-3' onClick={redirectToCalenderView}>
        <KTSVG path='/media/icons/duotune/files/fil001.svg' className='svg-icon-2' />
        Calender View
      </button>
      {/* end::Export */}

      {/* begin::Add user */}
      <Authorization allowedPermissions={['create-session']}>
        <button type='button' className='btn btn-primary' onClick={redirectAddSession}>
          <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
          Add Session
        </button>
      </Authorization>
      {/* end::Add user */}
    </div>
  )
}

export {PlayerListToolbar}
