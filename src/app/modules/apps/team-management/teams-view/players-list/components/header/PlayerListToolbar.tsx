import {KTSVG} from '../../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {UsersListFilter} from './UsersListFilter'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import TeamPlayerModal from './TeamPlayerModal';

const PlayerListToolbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='d-flex justify-content-end'>
      {!!isOpen && <TeamPlayerModal setIsOpen={setIsOpen} />}
      {/* begin::Add user */}
      <button type='button' className='btn btn-primary' onClick={() => setIsOpen(true)} >
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Add Player
      </button>
      {/* end::Add user */}
    </div>
  )
}

export {PlayerListToolbar}
