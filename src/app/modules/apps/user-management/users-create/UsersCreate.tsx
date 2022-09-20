import clsx from 'clsx'
import { useFormik } from 'formik'
import {KTCard, KTSVG} from '../../../../../_metronic/helpers'
import { getError } from '../../../../utils/helpers'
import { useState } from 'react';
import { createUser } from './core/_request';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  password_confirmation: '',
  role: '',
}

const UsersCreate = () => {

  const [loading, setLoading] = useState(false)
  const navigation = useNavigate()
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, {setStatus, setSubmitting, setFieldError, setFieldValue}) => {
      try {
        setLoading(true)
        await createUser(values)
        setLoading(false)
      } catch (error: any) {
        console.error(error.response)
        if(error?.response?.status === 422 && error?.response?.data?.errors) {
          error.response.data.errors.map((e: any) => setFieldError(e.field, getError(error.response.data.errors, e.field)))
        }
        if(error?.response?.data?.message) {
          setStatus(error.response.data.message)
        } else {
          setStatus('The users details is incorrect')
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
      navigation('/user-management/users')
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
                Assign User
              </h3>
          </div>
          <div className="card-body">
              {formik.status && (
                <div className='mb-lg alert alert-danger'>
                  <div className='alert-text font-weight-bold'>{formik.status}</div>
                </div>
              )}
              {/* begin::Form group Name */}
              <div className='fv-row mb-5'>
                <label className='form-label fw-bolder text-dark fs-7'>First Name</label>
                <input
                  placeholder='First Name'
                  type='text'
                  autoComplete='off'
                  {...formik.getFieldProps('firstName')}
                  className={clsx(
                    'form-control form-control-lg form-control fs-7',
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
              {/* begin::Form group Name */}
              <div className='fv-row mb-5'>
                <label className='form-label fw-bolder text-dark fs-7'>Last Name</label>
                <input
                  placeholder='Last Name'
                  type='text'
                  autoComplete='off'
                  {...formik.getFieldProps('lastName')}
                  className={clsx(
                    'form-control form-control-lg form-control fs-7',
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
              <div className='fv-row mb-5'>
                  <label className='form-label fs-7 fw-bolder text-dark'>Username</label>
                  <input
                  placeholder='Username'
                  {...formik.getFieldProps('username')}
                  className={clsx(
                      'form-control form-control-lg form-control fs-7',
                      {'is-invalid': formik.touched.username && formik.errors.username},
                      {
                      'is-valid': formik.touched.username && !formik.errors.username,
                      }
                  )}
                  type='text'
                  name='username'
                  autoComplete='off'
                  />
                   {formik.touched.username && formik.errors.username && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.username}</span>
                        </div>
                      </div>
                    )}
              </div>
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
              {/* begin::Form group Password */}
              <div className='mb-5 fv-row' data-kt-password-meter='true'>
                <div className='mb-1'>
                  <label className='form-label fw-bolder text-dark fs-7'>Password</label>
                  <div className='position-relative mb-3'>
                    <input
                      type='password'
                      placeholder='Password'
                      autoComplete='off'
                      {...formik.getFieldProps('password')}
                      className={clsx(
                        'form-control form-control-lg form-control fs-7',
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
                <label className='form-label fw-bolder text-dark fs-7'>Confirm Password</label>
                <input
                  type='password'
                  placeholder='Password confirmation'
                  autoComplete='off'
                  {...formik.getFieldProps('password_confirmation')}
                  className={clsx(
                    'form-control form-control-lg form-control fs-7',
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

export {UsersCreate}
