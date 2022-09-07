/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { MenuComponent } from '../../../../../../../../_metronic/assets/ts/components'
import { ID, KTSVG, QUERIES } from '../../../../../../../../_metronic/helpers'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { deletePlayer, updatePlayerSession } from '../../core/_requests'
import { useNavigate, useParams } from 'react-router-dom';
import { Player } from '../../core/_models'
import { useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
    player: Player
}

const PlayerAttendanceCell: FC<Props> = ({ player }) => {
    const navigation = useNavigate()
    const { query } = useQueryResponse()
    const queryClient = useQueryClient()

    const { id: queryId } = useParams()

    if (!queryId) {
        navigation('/error/404')
    }

    const sessionId = queryId as string

    const sessionAttendance = useMutation((option: boolean) => updatePlayerSession(sessionId, player.id, { attendance: option }), {
        // 💡 response of the mutation is passed to onSuccess
        onSuccess: () => {
            toast.success('Player Attendance Updated Successfully.')
            // ✅ update detail view directly
            queryClient.invalidateQueries([`${QUERIES.SESSION_PLAYER_LIST}-${sessionId}-${query}`])
            queryClient.invalidateQueries(['session-view', sessionId])
        },
    })

    return (
        <>
            {/* begin::Add user */}
            <div className='d-flex flex-column align-items-center'>
                {player.pivot_attendance === null ? (
                    <>
                        <div className='d-flex items-center'>
                            <a style={{ cursor: 'pointer' }} onClick={async () => await sessionAttendance.mutateAsync(true)} className="badge badge-success mx-1">
                                <i className="fa fa-check fs-2 text-white"></i>
                            </a>
                            <a style={{ cursor: 'pointer' }} onClick={async () => await sessionAttendance.mutateAsync(false)} className="badge badge-danger mx-1 px-3">
                                <i className="fa fa-remove fs-2 text-white"></i>
                            </a>
                        </div>
                    </>
                ) : (
                    <>
                        {!!player.pivot_attendance ? (
                            <span className="badge badge-success">YES</span>
                        ) : (
                            <span className="badge badge-danger">No</span>
                        )}
                    </>
                )}
            </div>
            {/* end::Add user */}
        </>
    )
}

export { PlayerAttendanceCell }
