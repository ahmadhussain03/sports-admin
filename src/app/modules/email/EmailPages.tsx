/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Navigate, Outlet, Route, Routes} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import { useAuth } from '../auth'
import { EmailVerification } from './components/EmailVerification'

const EmailVerificationLayout = () => {

  const {logout} = useAuth()

  useEffect(() => {
    document.body.classList.add('bg-body')
    return () => {
      document.body.classList.remove('bg-body')
    }
  }, [])

  return (
    <div
      className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
      style={{
        backgroundImage: `url(${toAbsoluteUrl('/media/illustrations/dozzy-1/14.png')})`,
      }}
    >
      {/* begin::Content */}
      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
        {/* begin::Logo */}
        <a href='#' className='mb-12'>
          <img alt='Logo' src={toAbsoluteUrl('/media/logos/default.svg')} className='h-45px' />
        </a>
        {/* end::Logo */}
        {/* begin::Wrapper */}
        <div className='w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto'>
          <Outlet />
        </div>
        {/* end::Wrapper */}
      </div>
      {/* end::Content */}
      {/* begin::Footer */}
      <div className='d-flex flex-center flex-column-auto p-10'>
        <div className='d-flex align-items-center fw-bold fs-6'>
          <a onClick={logout} className='text-muted text-hover-primary px-2' style={{ cursor: 'pointer' }}>
            Logout
          </a>
        </div>
      </div>
      {/* end::Footer */}
    </div>
  )
}

const EmailPage = () => (
  <Routes>
    <Route element={<EmailVerificationLayout />}>
      <Route index element={<EmailVerification />} />
      <Route path='*' element={<Navigate to='/error/404' />} />
    </Route>
  </Routes>
)

export {EmailPage}
