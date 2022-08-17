import React, {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link, useNavigate} from 'react-router-dom'
import {useFormik} from 'formik'
import {requestPasswordVerificationCode, resetPassword} from '../core/_requests'
import { getError } from '../../../utils/helpers'

const initialValues = {
  email: '',
}

const resetInitialValues = {
  email: '',
  verificationCode: '',
  password: '',
  password_confirmation: ''
}

export function ForgotPassword() {
  const navigation = useNavigate()
  const [isPasswordCodeSend, setIsPasswordCodeSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const formik = useFormik({
    initialValues,
    onSubmit: (values, {setStatus, setSubmitting, setFieldError}) => {
      setLoading(true)
      setHasErrors(undefined)
      requestPasswordVerificationCode(values.email)
          .then(({data: {result}}) => {
            setHasErrors(false)
            setLoading(false)
            setIsPasswordCodeSent(true)
            resetFormik.setFieldValue('email', values.email)
          })
          .catch((error: any) => {
            if(error?.response?.status === 422 && error?.response?.data?.errors) {
              error.response.data.errors.map((e: any) => setFieldError(e.field, getError(error.response.data.errors, e.field)))
            }
            setHasErrors(true)
            setLoading(false)
            setSubmitting(false)
            setStatus('The login detail is incorrect')
          })
    },
  })

  const resetFormik = useFormik({
    initialValues: resetInitialValues,
    onSubmit: (values, {setSubmitting, setFieldError}) => {
      setLoading(true)
      setHasErrors(undefined)
      resetPassword(values)
          .then(({data: {result}}) => {
            setHasErrors(false)
            setLoading(false)
            navigation('/auth/login')
          })
          .catch((error: any) => {
            if(error?.response?.status === 422 && error?.response?.data?.errors) {
              error.response.data.errors.map((e: any) => setFieldError(e.field, getError(error.response.data.errors, e.field)))
            }
            setHasErrors(true)
            setLoading(false)
            setSubmitting(false)
          })
    }
  })

  return (
    <>
      {!isPasswordCodeSend ? (
        <form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        noValidate
        id='kt_login_password_reset_form'
        onSubmit={formik.handleSubmit}
      >
        <div className='text-center mb-10'>
          {/* begin::Title */}
          <h1 className='text-dark mb-3'>Forgot Password ?</h1>
          {/* end::Title */}

          {/* begin::Link */}
          <div className='text-gray-400 fw-bold fs-4'>Enter your email to reset your password.</div>
          {/* end::Link */}
        </div>

        {/* begin::Title */}
        {hasErrors === true && (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>
              Sorry, looks like there are some errors detected, please try again.
            </div>
          </div>
        )}

        {hasErrors === false && (
          <div className='mb-10 bg-light-info p-8 rounded'>
            <div className='text-info'>Reset password verification code sent. Please check your email</div>
          </div>
        )}
        {/* end::Title */}

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <label className='form-label fw-bolder text-gray-900 fs-6'>Email</label>
          <input
            type='email'
            placeholder=''
            autoComplete='off'
            {...formik.getFieldProps('email')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {'is-invalid': formik.touched.email && formik.errors.email},
              {
                'is-valid': formik.touched.email && !formik.errors.email,
              }
            )}
          />
          {formik.touched.email && formik.errors.email && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>
                <span role='alert'>{formik.errors.email}</span>
              </div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
          <button
            type='submit'
            id='kt_password_reset_submit'
            className='btn btn-lg btn-primary fw-bolder me-4'
          >
            <span className='indicator-label'>Submit</span>
            {loading && (
              <span className='indicator-progress'>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
          <Link to='/auth/login'>
            <button
              type='button'
              id='kt_login_password_reset_form_cancel_button'
              className='btn btn-lg btn-light-primary fw-bolder'
              disabled={formik.isSubmitting || !formik.isValid}
            >
              Cancel
            </button>
          </Link>{' '}
        </div>
        {/* end::Form group */}
      </form>
      ) : (
        <form
          className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
          noValidate
          id='kt_login_password_reset_form'
          onSubmit={resetFormik.handleSubmit}
        >
          <div className='text-center mb-10'>
            {/* begin::Title */}
            <h1 className='text-dark mb-3'>Forgot Password ?</h1>
            {/* end::Title */}

            {/* begin::Link */}
            <div className='text-gray-400 fw-bold fs-4'>Enter New Password.</div>
            {/* end::Link */}
          </div>

          {/* begin::Title */}
          {hasErrors === true && (
            <div className='mb-lg-15 alert alert-danger'>
              <div className='alert-text font-weight-bold'>
                Sorry, looks like there are some errors detected, please try again.
              </div>
            </div>
          )}

          {hasErrors === false && (
            <div className='mb-10 bg-light-info p-8 rounded'>
              <div className='text-info'>Reset password verification code sent. Please check your email</div>
            </div>
          )}
          {/* end::Title */}

          {/* begin::Form group */}
          <div className='fv-row'>
            <input
              type='hidden'
              autoComplete='off'
              {...resetFormik.getFieldProps('email')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {'is-invalid': resetFormik.touched.email && resetFormik.errors.email},
                {
                  'is-valid': resetFormik.touched.email && !resetFormik.errors.email,
                }
              )}
            />
            {resetFormik.touched.email && resetFormik.errors.email && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{resetFormik.errors.email}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}

          {/* begin::Form group */}
          <div className='fv-row mb-10'>
            <label className='form-label fs-6 fw-bolder text-dark'>Verification Code</label>
            <input
              type='verificationCode'
              placeholder='Verification Code'
              autoComplete='off'
              {...resetFormik.getFieldProps('verificationCode')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {'is-invalid': resetFormik.touched.verificationCode && resetFormik.errors.verificationCode},
                {
                  'is-valid': resetFormik.touched.verificationCode && !resetFormik.errors.verificationCode,
                }
              )}
            />
            {resetFormik.touched.verificationCode && resetFormik.errors.verificationCode && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{resetFormik.errors.verificationCode}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}

          {/* begin::Form group */}
          <div className='fv-row mb-10'>
            <label className='form-label fs-6 fw-bolder text-dark'>Password</label>
            <input
              type='password'
              placeholder='Password'
              autoComplete='off'
              {...resetFormik.getFieldProps('password')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {'is-invalid': resetFormik.touched.password && resetFormik.errors.password},
                {
                  'is-valid': resetFormik.touched.password && !resetFormik.errors.password,
                }
              )}
            />
            {resetFormik.touched.password && resetFormik.errors.password && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{resetFormik.errors.password}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}

          {/* begin::Form group */}
          <div className='fv-row mb-10'>
            <label className='form-label fs-6 fw-bolder text-dark'>Password Confirmation</label>
            <input
              type='password'
              placeholder='Password Confirmation'
              autoComplete='off'
              {...resetFormik.getFieldProps('password_confirmation')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {'is-invalid': resetFormik.touched.password_confirmation && resetFormik.errors.password_confirmation},
                {
                  'is-valid': resetFormik.touched.password_confirmation && !resetFormik.errors.password_confirmation,
                }
              )}
            />
            {resetFormik.touched.password_confirmation && resetFormik.errors.password_confirmation && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{resetFormik.errors.password_confirmation}</span>
                </div>
              </div>
            )}
          </div>
          {/* end::Form group */}

          {/* begin::Form group */}
          <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
            <button
              type='submit'
              id='kt_password_reset_submit'
              className='btn btn-lg btn-primary fw-bolder me-4'
            >
              <span className='indicator-label'>Submit</span>
              {loading && (
                <span className='indicator-progress'>
                  Please wait...
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                </span>
              )}
            </button>
            <Link to='/auth/login'>
              <button
                type='button'
                id='kt_login_password_reset_form_cancel_button'
                className='btn btn-lg btn-light-primary fw-bolder'
                disabled={resetFormik.isSubmitting || !resetFormik.isValid}
              >
                Cancel
              </button>
            </Link>{' '}
          </div>
          {/* end::Form group */}
        </form>
      )}
    </>
  )
}
