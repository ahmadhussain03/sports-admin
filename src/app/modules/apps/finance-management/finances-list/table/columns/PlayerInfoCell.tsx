/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import { FC } from 'react'
import { toAbsoluteUrl } from '../../../../../../../_metronic/helpers'
import { useNavigate } from 'react-router-dom';
import { Player } from '../../../../player-management/players-list/core/_models';

type Props = {
  player: Player
}

const PlayerInfoCell: FC<Props> = ({ player }) => {

  const navigate = useNavigate()

  return (
    <div className='d-flex align-items-center'>
      {/* begin:: Avatar */}
      <div className='d-flex flex-column'>
        <a style={{ cursor: 'pointer' }} onClick={() => navigate(`/player-management/players/view/${player.id}`)} className='text-gray-800 text-hover-primary mb-1'>
          {player.first_name} {player.last_name}
        </a>
      </div>
    </div>
  )
}

export { PlayerInfoCell }
