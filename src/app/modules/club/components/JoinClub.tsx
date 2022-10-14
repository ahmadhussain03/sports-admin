/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {getError} from '../../../utils/helpers'
import { useAuth } from '../../auth/core/Auth'
import { joinClub } from '../core/_request'

const initialValues = {
  clubCode: '',
  role: '',
}

export function JoinClub() {
  const [loading, setLoading] = useState(false)
  const {setCurrentUser} = useAuth()

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, {setStatus, setSubmitting, setFieldError}) => {
      setLoading(true)
      try {
        const {data: user} = await joinClub(values)
        setCurrentUser(user)
      } catch (error: any) {
        if(error?.response?.status === 422 && error?.response?.data?.errors) {
          error.response.data.errors.map((e: any) => setFieldError(e.field, getError(error.response.data.errors, e.field)))
        }
        if(error?.response?.data?.message) {
          setStatus(error.response.data.message)
        } else {
          setStatus('The club detail is incorrect')
        }

        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
    >
      {/* begin::Heading */}
      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3'>Create a Club</h1>
        <div className='text-gray-400 fw-bold fs-4'>
          Don't Have Code?{' '}
          <Link to='/club' className='link-primary fw-bolder'>
            Create Club
          </Link>
        </div>
      </div>
      {/* begin::Heading */}

      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}
      
      {/* begin::Form group */}
      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>Club Code</label>
        <input
          placeholder='Club Code'
          {...formik.getFieldProps('clubCode')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.clubCode && formik.errors.clubCode},
            {
              'is-valid': formik.touched.clubCode && !formik.errors.clubCode,
            }
          )}
          type='text'
          name='clubCode'
          autoComplete='off'
        />
        {formik.touched.clubCode && formik.errors.clubCode && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.clubCode}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

       {/* begin::Form group Club Name */}
      <div className='fv-row mb-7'>
        <label className='form-label fw-bolder text-dark fs-6'>Role</label>
        <select
          placeholder='Club Code'
          {...formik.getFieldProps('role')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.role && formik.errors.role},
            {
              'is-valid': formik.touched.role && !formik.errors.role,
            }
          )}
        >
          <option>Select Role</option>
          <option value="Coach">Coach</option>
          <option value="Treasurie">Treasurie</option>
          <option value="Secretary">Secretary</option>
        </select>
        {formik.touched.role && formik.errors.role && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.role}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Action */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Join</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}
    </form>
  )
}
