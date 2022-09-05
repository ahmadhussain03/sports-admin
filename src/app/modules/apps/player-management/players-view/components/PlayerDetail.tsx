
import { FC } from 'react';
import { Player } from '../../players-list/core/_models';

interface IPlayerDetail {
    player: Player
}

const PlayerDetail: React.FC<IPlayerDetail> = ({ player }) => {
    return (
        <div className='container'>
            <div className="row">
                <div className="card card-custom col me-4">
                    <div className="card-body">
                        <div className="d-flex flex-column">
                            <h1>Player Detail</h1>
                            <div className="d-flex flex-column my-4">
                                <p className="fs-5 m-0">Player Name</p>
                                <h3 className='m-0'>{player.first_name} {player.last_name}</h3>
                            </div>
                            <div className="d-flex flex-column my-4">
                                <p className="fs-5 m-0">Phone Number</p>
                                <h3 className='m-0'>{player.phone_number}</h3>
                            </div>
                            <div className="d-flex flex-column my-4">
                                <p className="fs-5 m-0">Email</p>
                                <h3 className='m-0'>{player.email}</h3>
                            </div>
                            <div className="d-flex flex-column my-4">
                                <p className="fs-5 m-0">Address</p>
                                <h3 className='m-0'>{player.address}</h3>
                            </div>
                            {!!player.notes && (
                                <div className="d-flex flex-column my-4">
                                    <p className="fs-5 m-0">Notes</p>
                                    <h3 className='m-0'>{player.notes}</h3>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="card card-custom col me-4">
                    <div className="card-body">
                    <div className="d-flex flex-column">
                            <h1>Financial Details</h1>
                            <div className="d-flex flex-column my-4">
                                <p className="fs-5 m-0">Player Name</p>
                                <h3 className='m-0'>{player.last_name} {player.last_name}</h3>
                            </div>
                            <div className="d-flex flex-column my-4">
                                <p className="fs-5 m-0">Sessions Attended</p>
                                <h3 className='m-0'>{player.attended_count}</h3>
                            </div>
                            <div className="d-flex flex-column my-4">
                                <p className="fs-5 m-0">Sessions Outstanding</p>
                                <h3 className='m-0'>{player.session_outstanding_count}</h3>
                            </div>
                            <div className="d-flex flex-column my-4">
                                <p className="fs-5 m-0">Outstanding Payment</p>
                                <h3 className='m-0'>{player.payment_outstanding_count}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    )
}

export default PlayerDetail