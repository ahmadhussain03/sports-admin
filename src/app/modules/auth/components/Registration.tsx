/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {getUserByToken, register} from '../core/_requests'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {PasswordMeterComponent} from '../../../../_metronic/assets/ts/components'
import {useAuth} from '../core/Auth'
import { getError } from '../../../utils/helpers'

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  password_confirmation: '',
  clubName: '',
}

export function Registration() {
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, {setStatus, setSubmitting, setFieldError}) => {
      setLoading(true)
      try {
        const {data: auth} = await register(
          {
            clubName: values.clubName,
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            password: values.password,
            password_confirmation: values.password_confirmation,
            username: values.username
          }
        )
        saveAuth(auth)
        setCurrentUser(auth.user)
      } catch (error: any) {
        console.error(error.response)
        if(error?.response?.status === 422 && error?.response?.data?.errors) {
          error.response.data.errors.map((e: any) => setFieldError(e.field, getError(error.response.data.errors, e.field)))
        }
        if(error?.response?.data?.message) {
          setStatus(error.response.data.message)
        } else {
          setStatus('The registration details is incorrect')
        }
        saveAuth(undefined)
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      onSubmit={formik.handleSubmit}
    >
      {/* begin::Heading */}
      <div className='mb-10 text-center'>
        {/* begin::Title */}
        <h1 className='text-dark mb-3'>Create an Account</h1>
        {/* end::Title */}

        {/* begin::Link */}
        <div className='text-gray-400 fw-bold fs-4'>
          Already have an account?
          <Link to='/auth/login' className='link-primary fw-bolder' style={{marginLeft: '5px'}}>
            Sign In
          </Link>
        </div>
        {/* end::Link */}
      </div>
      {/* end::Heading */}

      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      {/* begin::Form group Email */}
      <div className='fv-row mb-7'>
        <label className='form-label fw-bolder text-dark fs-6'>First Name</label>
        <input
          placeholder='First Name'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('firstName')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.firstName && formik.errors.firstName},
            {
              'is-valid': formik.touched.firstName && !formik.errors.firstName,
            }
          )}
        />
        {formik.touched.firstName && formik.errors.firstName && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.firstName}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

       {/* begin::Form group Email */}
      <div className='fv-row mb-7'>
        <label className='form-label fw-bolder text-dark fs-6'>Last Name</label>
        <input
          placeholder='Last Name'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('lastName')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.lastName && formik.errors.lastName},
            {
              'is-valid': formik.touched.lastName && !formik.errors.lastName,
            }
          )}
        />
        {formik.touched.lastName && formik.errors.lastName && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.lastName}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Username */}
      <div className='fv-row mb-7'>
        <label className='form-label fw-bolder text-dark fs-6'>Username</label>
        <input
          placeholder='Username'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('username')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.username && formik.errors.username},
            {
              'is-valid': formik.touched.username && !formik.errors.username,
            }
          )}
        />
        {formik.touched.username && formik.errors.username && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.username}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Email */}
      <div className='fv-row mb-7'>
        <label className='form-label fw-bolder text-dark fs-6'>Email</label>
        <input
          placeholder='Email'
          type='email'
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

      {/* begin::Form group Club Name */}
      <div className='fv-row mb-7'>
        <label className='form-label fw-bolder text-dark fs-6'>Club Name</label>
        <input
          placeholder='Club Name'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('clubName')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.clubName && formik.errors.clubName},
            {
              'is-valid': formik.touched.clubName && !formik.errors.clubName,
            }
          )}
        />
        {formik.touched.clubName && formik.errors.clubName && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.clubName}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Password */}
      <div className='mb-7 fv-row' data-kt-password-meter='true'>
        <div className='mb-1'>
          <label className='form-label fw-bolder text-dark fs-6'>Password</label>
          <div className='position-relative mb-3'>
            <input
              type='password'
              placeholder='Password'
              autoComplete='off'
              {...formik.getFieldProps('password')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.password && formik.errors.password,
                },
                {
                  'is-valid': formik.touched.password && !formik.errors.password,
                }
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.password}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group Confirm password */}
      <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>Confirm Password</label>
        <input
          type='password'
          placeholder='Password confirmation'
          autoComplete='off'
          {...formik.getFieldProps('password_confirmation')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.password_confirmation && formik.errors.password_confirmation,
            },
            {
              'is-valid': formik.touched.password_confirmation && !formik.errors.password_confirmation,
            }
          )}
        />
        {formik.touched.password_confirmation && formik.errors.password_confirmation && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password_confirmation}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Submit</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Form group */}
    </form>
  )
}
