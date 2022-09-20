import {KTSVG} from '../../../../../../../../_metronic/helpers'
import {useListView} from '../../core/ListViewProvider'
import {UsersListFilter} from './UsersListFilter'
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import SessionPlayerModal from './SessionPlayerModal';
import { sendOutstandingPaymentRequest } from '../../../../../finance-management/finances-list/core/_requests';
import { toast } from 'react-toastify';

const PlayerListToolbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  const sendPaymentRequest = async () => {
    setLoading(true)
    try {
      await sendOutstandingPaymentRequest({ session: id })
      toast.success("Outstanding Payment Request Sent.")
    } catch (e: any) {
      toast.error('Something Went Wrong!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='d-flex justify-content-end'>
      {!!isOpen && <SessionPlayerModal setIsOpen={setIsOpen} />}
      {/* begin::Add user */}
      <button type='button' className='btn btn-success me-3' onClick={() => setIsOpen(true)} >
        <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
        Add Player
      </button>
      {/* end::Add user */}
      <button type='button' className='btn btn-primary' onClick={sendPaymentRequest} disabled={loading}>
        {!loading && <KTSVG path='/media/icons/duotune/finance/fin009.svg' className='svg-icon-2' />}
        {!!loading && <span className='spinner-border spinner-border-sm align-middle me-2'></span>}
        Send Request for Outstanding Money
      </button>
    </div>
  )
}

export {PlayerListToolbar}
