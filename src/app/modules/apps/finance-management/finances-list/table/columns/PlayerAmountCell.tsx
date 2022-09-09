/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { Player } from '../../../../player-management/players-list/core/_models';

type Props = {
    player: Player
}

const PlayerAmountCell: FC<Props> = ({ player }) => {

    return (
        <span className='text-gray-800'>{player.payment_outstanding_count + player.payment_made}</span>
    )
}

export { PlayerAmountCell }
