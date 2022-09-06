/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../../_metronic/helpers'
import {Team} from '../../core/_models'
import { useNavigate } from 'react-router-dom';

type Props = {
  team: Team
}

const TeamInfoCell: FC<Props> = ({team}) => {
  
  const navigate = useNavigate()

  return (
    <div className='d-flex align-items-center'>
      {/* begin:: Avatar */}
      <div className='d-flex flex-column'>
        <a style={{cursor: 'pointer'}} onClick={() => navigate(`/team-management/teams/view/${team.id}`)} className='text-gray-800 text-hover-primary mb-1'>
          {team.name}
        </a>
      </div>
    </div>
  )
}

export {TeamInfoCell}
