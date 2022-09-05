/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC, useEffect} from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {MenuComponent} from '../../../../../../../../_metronic/assets/ts/components'
import {ID, KTSVG, QUERIES} from '../../../../../../../../_metronic/helpers'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {deletePlayer, markPaidSession} from '../../core/_requests'
import { useNavigate, useParams } from 'react-router-dom';
import { Player } from '../../core/_models'

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

  const paySession = useMutation(() => markPaidSession(sessionId, player.id, { paid: true }), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.SESSION_PLAYER_LIST}-${sessionId}-${query}`])
      queryClient.invalidateQueries(['session-view', sessionId])
    },
  })

  return (
    <>
      {/* begin::Add user */}
      <div className='d-flex flex-column align-items-center'>
        {player.pivot_paid === null ? (
            <button type='button' className='btn btn-outline-success btn-sm' onClick={async () => await paySession.mutateAsync()}>
                <KTSVG path='/media/icons/duotune/general/gen048.svg' className='svg-icon-1' />
            </button>
        ) : (
            <span className="badge badge-success">Paid</span>
            )}
      </div>
      {/* end::Add user */}
    </>
  )
}

export {PlayerPaidCell}
