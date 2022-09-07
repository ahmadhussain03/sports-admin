/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { Player } from '../../core/_models'

type Props = {
    player: Player
}

const PlayerRsvpCell: FC<Props> = ({ player }) => {

    return (
        <>
            {/* begin::Add user */}
            <div className='d-flex flex-column align-items-center'>
                {!!player.pivot_rsvp ? (
                    <span className="badge badge-success">YES</span>
                ) : (
                    <span className="badge badge-danger">NO</span>
                )}
            </div>
            {/* end::Add user */}
        </>
    )
}

export { PlayerRsvpCell }
