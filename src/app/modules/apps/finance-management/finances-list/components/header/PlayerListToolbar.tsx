import { KTSVG } from '../../../../../../../_metronic/helpers'
import { useListView } from '../../core/ListViewProvider'
import { UsersListFilter } from './UsersListFilter'
import { useNavigate } from 'react-router-dom';
import { sendOutstandingPaymentRequest } from '../../core/_requests';
import { toast } from 'react-toastify';
import { useQueryRequest } from '../../core/QueryRequestProvider';
import { useState } from 'react';

const PlayerListToolbar = () => {

  const { state } = useQueryRequest()
  const [loading, setLoading] = useState(false)

  const sendPaymentRequest = async () => {
    setLoading(true)
    try {
      await sendOutstandingPaymentRequest(state.filter)
      toast.success("Outstanding Payment Request Sent.")
    } catch (e: any) {
      toast.error('Something Went Wrong!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
      {/* <UsersListFilter /> */}

      {/* begin::Add user */}
      <button type='button' className='btn btn-primary' onClick={sendPaymentRequest} disabled={loading}>
        {!loading && <KTSVG path='/media/icons/duotune/finance/fin009.svg' className='svg-icon-2' />}
        {!!loading && <span className='spinner-border spinner-border-sm align-middle me-2'></span>}
        Send Request for Outstanding Money
      </button>
      {/* end::Add user */}
    </div>
  )
}

export { PlayerListToolbar }
