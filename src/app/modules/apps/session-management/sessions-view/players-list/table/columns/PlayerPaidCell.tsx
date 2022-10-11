/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useCallback, useEffect} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {MenuComponent} from '../../../../../../../../_metronic/assets/ts/components'
import {ID, KTSVG, QUERIES} from '../../../../../../../../_metronic/helpers'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deletePlayer, updatePlayerSession} from '../../core/_requests'
import { useNavigate, useParams } from 'react-router-dom';
import { Player } from '../../core/_models'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import clsx from 'clsx';

type Props = {
  player: Player
}

const PlayerPaidCell: FC<Props> = ({player}) => {
  const navigation = useNavigate()
  const {query} = useQueryResponse()
  const queryClient = useQueryClient()

  const { id: queryId } = useParams()

  if(!queryId) {
    navigation('/error/404')
  }

  const sessionId = queryId as string

  const paySession = useMutation((paid: boolean) => updatePlayerSession(sessionId, player.id, { paid }), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.SESSION_PLAYER_LIST}-${sessionId}-${query}`])
      queryClient.invalidateQueries(['session-view', sessionId])
      queryClient.invalidateQueries([QUERIES.SESSION_LOG_LIST, sessionId])
    },
  })

  const onPaymentClick = async () => {
    confirmAlert({
     customUI: ({ onClose }) => {

        const onConfirm = async () => {
          await paySession.mutateAsync(!player.pivot_paid)
          onClose()
        }

        return (
          <div className={clsx('alert alert-dismissible d-flex flex-center flex-column py-10 px-10 px-lg-20 mb-10', !!player.pivot_paid ? 'bg-light-danger' : 'bg-light-success')}>
            <button onClick={onClose} type="button" className={clsx('position-absolute top-0 end-0 m-2 btn btn-icon', !!player.pivot_paid ? 'btn-icon-danger' : 'btn-icon-success')} data-bs-dismiss="alert">
                <KTSVG path='/media/icons/duotune/general/gen040.svg' className='svg-icon-1' />
            </button>

            <div className="text-center">
              <h5 className="fw-bolder fs-1 mb-5">Change Player Payment Status</h5>

              <div className={clsx('separator separator-dashed opacity-25 mb-5', !!player.pivot_paid ? 'border-danger' : 'border-success')}></div>

              <div className="mb-9">
                Want to change status to {!player.pivot_paid ? 'Paid' : 'Unpaid'}
              </div>
              <div className="d-flex flex-center flex-wrap">
                <button onClick={onClose} className={clsx('btn btn-outline m-2', !!player.pivot_paid ? 'btn-outline-danger btn-active-danger' : 'btn-outline-success btn-active-success' )}>Cancel</button>
                <button onClick={onConfirm} className={clsx('btn m-2', !!player.pivot_paid ? 'btn-danger' : 'btn-success')}>Ok, Sure</button>
              </div>
            </div>
          </div>
        )
     }
    });
  };

  return (
    <>
      {/* begin::Add user */}
      <div className='d-flex flex-column align-items-center'>
        {!player.pivot_paid ? (
            <button type='button' className='btn btn-outline-success btn-sm' onClick={onPaymentClick}>
                <KTSVG path='/media/icons/duotune/general/gen048.svg' className='svg-icon-1' />
            </button>
        ) : (
            <button type='button' className='btn btn-outline-success btn-sm' onClick={onPaymentClick}>
              <span className="badge badge-success">Paid</span>
            </button>
            )}
      </div>
      {/* end::Add user */}
    </>
  )
}

export {PlayerPaidCell}
