/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import { FC } from 'react'
import { SessionLog } from '../../core/_models'
import { useNavigate } from 'react-router-dom';

type Props = {
  sessionLog: SessionLog
}

const SessionInfoCell: FC<Props> = ({ sessionLog }) => {

  return (
    <div className='d-flex align-items-center'>
      {/* begin:: Avatar */}
      <div className='d-flex flex-column'>
        <a href='#' className='text-gray-800 text-hover-primary mb-1'>
          {sessionLog.user.first_name} {sessionLog.user.last_name}
        </a>
      </div>
    </div>
  )
}

export { SessionInfoCell }
