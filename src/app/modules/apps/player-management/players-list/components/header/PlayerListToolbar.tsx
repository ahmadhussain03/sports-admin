import {KTSVG} from '../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {UsersListFilter} from './UsersListFilter'
import { useNavigate } from 'react-router-dom';

const PlayerListToolbar = () => {
  const navigation = useNavigate()

  const redirectAddTeam = () => {
    navigation('/player-management/players/create')
  }

  const redirectUncategorizedPlayers = () => {
    navigation('/uncategorized-player-management/players')
  }

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {/* <UsersListFilter /> */}

      {/* begin::Export */}
      <button type='button' className='btn btn-success me-3' onClick={redirectUncategorizedPlayers}>
        <KTSVG path='/media/icons/duotune/files/fil001.svg' className='svg-icon-2' />
        Uncategorized Players
      </button>
      {/* end::Export */}

      {/* begin::Add user */}
      <button type='button' className='btn btn-primary' onClick={redirectAddTeam}>
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Add Player
      </button>
      {/* end::Add user */}
    </div>
  )
}

export {PlayerListToolbar}
