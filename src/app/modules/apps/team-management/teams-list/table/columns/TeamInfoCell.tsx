/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../../_metronic/helpers'
import {Team} from '../../core/_models'

type Props = {
  team: Team
}

const TeamInfoCell: FC<Props> = ({team}) => (
  <div className='d-flex align-items-center'>
    {/* begin:: Avatar */}
    <div className='d-flex flex-column'>
      <a href='#' className='text-gray-800 text-hover-primary mb-1'>
        {team.name}
      </a>
    </div>
  </div>
)

export {TeamInfoCell}
