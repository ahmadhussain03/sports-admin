/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../../../../../_metronic/helpers'
import {Session} from '../../core/_models'
import { useNavigate } from 'react-router-dom';

type Props = {
  session: Session
}

const SessionInfoCell: FC<Props> = ({session}) => {

  const navigation = useNavigate()

  return (
    <div className='d-flex align-items-center'>
      {/* begin:: Avatar */}
      <div className='d-flex flex-column'>
        <a style={{cursor: 'pointer'}} onClick={() => navigation('/session-management/sessions/view/' + session.id)} className='text-gray-800 text-hover-primary mb-1'>
          {session.name}
        </a>
      </div>
    </div>
  )
}

export {SessionInfoCell}
