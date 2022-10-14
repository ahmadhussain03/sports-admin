/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useQueryResponse } from '../../core/QueryResponseProvider'
import { toast } from 'react-toastify';
import { User } from '../../core/_models';
import { approveUser, rejectUser } from '../../core/_requests';
import { QUERIES } from '../../../../../../../_metronic/helpers';

type Props = {
    user: User
}

const UserApprovalCell: FC<Props> = ({ user }) => {
    const { query } = useQueryResponse()
    const queryClient = useQueryClient()

    const userApproval = useMutation((option: boolean) => {
        if(option) {
            return approveUser(user.id)
        } else {
            return rejectUser(user.id)
        }
    }, {
        onSuccess: () => {
            toast.success('Player Attendance Updated Successfully.')
            queryClient.invalidateQueries([`${QUERIES.USERS_APPROVAL_LIST}-${query}`])
        },
    })

    return (
        <>
            {/* begin::Add user */}
            <div className='d-flex flex-column align-items-center'>
               <div className='d-flex items-center'>
                    <a style={{ cursor: 'pointer' }} onClick={async () => await userApproval.mutateAsync(true)} className="badge badge-success mx-1">
                        <i className="fa fa-check fs-2 text-white"></i>
                    </a>
                    <a style={{ cursor: 'pointer' }} onClick={async () => await userApproval.mutateAsync(false)} className="badge badge-danger mx-1 px-3">
                        <i className="fa fa-remove fs-2 text-white"></i>
                    </a>
                </div>
            </div>
            {/* end::Add user */}
        </>
    )
}

export { UserApprovalCell }
