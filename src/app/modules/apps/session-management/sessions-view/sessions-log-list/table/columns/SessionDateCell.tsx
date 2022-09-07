/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import { FC } from 'react'
import { SessionLog } from '../../core/_models'
import moment from 'moment'

type Props = {
    sessionLog: SessionLog
}

const SessionDateCell: FC<Props> = ({ sessionLog }) => {

    return (
        <div className='d-flex align-items-center'>
            {/* begin:: Avatar */}
            <div className='d-flex flex-column'>
                <p className='text-gray-800 text-hover-primary mb-1'>
                    {moment(sessionLog.created_at).format('YYYY-MM-DD hh:mm:s')}
                </p>
            </div>
        </div>
    )
}

export { SessionDateCell }
