/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import {useAuth} from '../../auth/core/Auth'
import { resendEmailVerification } from '../core/_request'


export function EmailVerification() {
  const {currentUser} = useAuth()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const resendLink = async () => {
    try {
        const response = await resendEmailVerification()
        setSuccess(response.data.message);
    } catch(error: any) {
        if(error?.response?.data?.message) {
            setError(error?.response?.data?.message)
        } else if(error?.response?.message) {
            setError(error?.response?.message)
        } else {
            setError('Something Went Wrong!')
        }
    }
  }

  return (
    <div>
        {success && (
            <div className="alert alert-dismissible bg-light-success border border-success d-flex flex-column justify-center items-center flex-sm-row p-5 mb-10">
                <div className="d-flex flex-column text-success">
                    <span>{success}</span>
                </div>
                
                <button onClick={() => setSuccess('')} type="button" className="position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto" data-bs-dismiss="alert">
                    <span className="svg-icon svg-icon-1 svg-icon-success">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="currentColor"/>
                            <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="currentColor"/>
                            <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="currentColor"/>
                        </svg>
                    </span>
                </button>
            </div>
        )}
        {error && (
            <div className="alert alert-dismissible bg-light-danger border border-danger d-flex flex-column flex-sm-row p-5 mb-10">
                <div className="d-flex flex-column text-danger pe-0 pe-sm-10">
                    <span>{error}</span>
                </div>
            
                <button onClick={() => setError('')} type="button" className="position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto" data-bs-dismiss="alert">
                    <span className="svg-icon svg-icon-1 svg-icon-danger">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="currentColor"/>
                            <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="currentColor"/>
                            <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="currentColor"/>
                        </svg>
                    </span>
                </button>
            </div>
        )}
        {/* begin::Heading */}
      <div className='mb-10 text-center'>
        {/* begin::Title */}
        <h1 className='text-dark mb-3'>Email Verification</h1>
        {/* end::Title */}

        {/* begin::Link */}
        <div className='text-gray-400 fw-bold fs-4'>
        We have sent an email to {currentUser?.email}. Please click the link in it to activate your account.
        <a onClick={() => resendLink()} className='link-primary fw-bolder cursor-pointer' style={{marginLeft: '5px'}}>
            Click here to resend the email.
        </a>
        </div>
        {/* end::Link */}
      </div>
      {/* end::Heading */}
    </div>
  )
}
