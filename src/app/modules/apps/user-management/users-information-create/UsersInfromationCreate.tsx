import clsx from 'clsx'
import { useFormik } from 'formik'
import {KTCard, KTSVG} from '../../../../../_metronic/helpers'
import { getError } from '../../../../utils/helpers'
import { useState } from 'react';
import { createUserInformation } from './core/_request';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  email: '',
  role: '',
}

const UsersInformationCreate = () => {

  const [loading, setLoading] = useState(false)
  const navigation = useNavigate()
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, {setStatus, setSubmitting, setFieldError, setFieldValue}) => {
      try {
        setLoading(true)
        await createUserInformation(values)
        setLoading(false)
      } catch (error: any) {
        console.error(error.response)
        if(error?.response?.status === 422 && error?.response?.data?.errors) {
          error.response.data.errors.map((e: any) => setFieldError(e.field, getError(error.response.data.errors, e.field)))
        }
        if(error?.response?.data?.message) {
          setStatus(error.response.data.message)
        } else {
          setStatus('The users information details is incorrect')
        }
        setSubmitting(false)
        setLoading(false)
        throw new Error(error)
      }
    },
  })

  const onSave = (e: any) => {
    e?.preventDefault()
    formik.submitForm().then(() => {      
      navigation('/user-management/users/information-form')
    })
  }

  const onSaveAndCreateNew = (e: any) => {
    e?.preventDefault()
    formik.submitForm().then(() => {
      formik.resetForm()
    })
  }

  return (
    <>
      <form 
      className='form fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      onSubmit={formik.handleSubmit}>
        <div className="card card-custom">
          <div className="card-header">
              <h3 className="card-title">
                <span style={{cursor: 'pointer'}} onClick={() => navigation(-1)}>
                  <KTSVG path='/media/icons/duotune/arrows/arr002.svg' className='svg-icon-2 me-2' />
                </span> 
                Create User Information Form
              </h3>
          </div>
          <div className="card-body">
              {formik.status && (
                <div className='mb-lg alert alert-danger'>
                  <div className='alert-text font-weight-bold'>{formik.status}</div>
                </div>
              )}
              {/* begin::Form group Email */}
              <div className='fv-row mb-5'>
                <label className='form-label fw-bolder text-dark fs-7'>Email</label>
                <input
                  placeholder='Email'
                  type='email'
                  autoComplete='off'
                  {...formik.getFieldProps('email')}
                  className={clsx(
                    'form-control form-control-lg form-control fs-7',
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

              {/* begin::Form group Role */}
              <div className='fv-row'>
                <label className='form-label fw-bolder text-dark fs-7'>Role</label>
                <select {...formik.getFieldProps('role')}
                  className={clsx(
                    'form-select form-select fs-7',
                    {
                      'is-invalid': formik.touched.role && formik.errors.role,
                    },
                    {
                      'is-valid': formik.touched.role && !formik.errors.role,
                    }
                  )} aria-label="Select example">
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
          </div>
          <div className="card-footer">
            <div className='d-flex flex-row flex-end'>
              <button
                type='button'
                onClick={onSave}
                className='btn btn-primary mb-5 mx-1 fs-7'
                disabled={formik.isSubmitting || !formik.isValid}
              >
                {!loading && <span className='indicator-label'>Create</span>}
                {loading && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    Please wait...{' '}
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
              <button
                type='button'
                onClick={onSaveAndCreateNew}
                className='btn btn-primary mb-5 fs-7'
                disabled={formik.isSubmitting || !formik.isValid}
              >
                {!loading && <span className='indicator-label'>Create & Add New</span>}
                {loading && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    Please wait...{' '}
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export {UsersInformationCreate}
