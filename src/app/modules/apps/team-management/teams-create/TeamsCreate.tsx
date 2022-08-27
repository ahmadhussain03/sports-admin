import clsx from 'clsx'
import { useFormik } from 'formik'
import {KTCard, KTSVG} from '../../../../../_metronic/helpers'
import { getError } from '../../../../utils/helpers'
import { useState, useEffect } from 'react';
import { createTeam } from './core/_request';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth';

const initialValues = {
  name: '',
  league: '',
  notes: '',
  club_name: '',
}

const TeamsCreate = () => {

  const [loading, setLoading] = useState(false)
  const {currentUser} = useAuth()
  const navigation = useNavigate()
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, {setStatus, setSubmitting, setFieldError, setFieldValue}) => {
      try {
        setLoading(true)
        await createTeam(values)
        setLoading(false)
      } catch (error: any) {
        if(error?.response?.status === 422 && error?.response?.data?.errors) {
          error.response.data.errors.map((e: any) => setFieldError(e.field, getError(error.response.data.errors, e.field)))
        }
        if(error?.response?.data?.message) {
          setStatus(error.response.data.message)
        } else {
          setStatus('The teams details is incorrect')
        }
        setSubmitting(false)
        setLoading(false)
        throw new Error(error)
      }
    },
  })

  useEffect(() => {
    if(currentUser?.club?.name) {
      formik.setFieldValue('club_name', currentUser.club.name)
    }
  }, [currentUser?.club?.name])

  const onSave = (e: any) => {
    e?.preventDefault()
    formik.submitForm().then(() => {      
      navigation('/team-management/teams')
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
                Edit Team
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
                <label className='form-label fw-bolder text-dark fs-7'>Club Name</label>
                <input
                  placeholder='Club Name'
                  type='text'
                  disabled
                  autoComplete='off'
                  {...formik.getFieldProps('club_name')}
                  className={clsx(
                    'form-control form-control-lg form-control fs-7',
                    {'is-invalid': formik.touched.club_name && formik.errors.club_name},
                    {
                      'is-valid': formik.touched.club_name && !formik.errors.club_name,
                    }
                  )}
                />
              </div>
              {/* begin::Form group Name */}
              <div className='fv-row mb-5'>
                <label className='form-label fw-bolder text-dark fs-7 required'>Team Name</label>
                <input
                  placeholder='Name'
                  type='text'
                  autoComplete='off'
                  {...formik.getFieldProps('name')}
                  className={clsx(
                    'form-control form-control-lg form-control fs-7',
                    {'is-invalid': formik.touched.name && formik.errors.name},
                    {
                      'is-valid': formik.touched.name && !formik.errors.name,
                    }
                  )}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.name}</span>
                    </div>
                  </div>
                )}
              </div>
              {/* end::Form group */}
              {/* begin::Form group Username */}
              <div className='fv-row mb-5'>
                  <label className='form-label fs-7 fw-bolder text-dark required'>League</label>
                  <input
                  placeholder='League'
                  {...formik.getFieldProps('league')}
                  className={clsx(
                      'form-control form-control-lg form-control fs-7',
                      {'is-invalid': formik.touched.league && formik.errors.league},
                      {
                      'is-valid': formik.touched.league && !formik.errors.league,
                      }
                  )}
                  type='text'
                  name='league'
                  autoComplete='off'
                  />
                   {formik.touched.league && formik.errors.league && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.league}</span>
                        </div>
                      </div>
                    )}
              </div>

              {/* begin::Form group Username */}
              <div className='fv-row mb-5'>
                  <label className='form-label fs-7 fw-bolder text-dark'>Notes</label>
                  <textarea
                  placeholder='Notes'
                  {...formik.getFieldProps('notes')}
                  className={clsx(
                      'form-control form-control-lg form-control fs-7',
                      {'is-invalid': formik.touched.notes && formik.errors.notes},
                      {
                      'is-valid': formik.touched.notes && !formik.errors.notes,
                      }
                  )}
                  name='notes'
                  autoComplete='off'
                  />
                   {formik.touched.notes && formik.errors.notes && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{formik.errors.notes}</span>
                        </div>
                      </div>
                    )}
              </div>
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

export {TeamsCreate}
