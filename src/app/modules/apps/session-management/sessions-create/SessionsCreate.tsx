import clsx from 'clsx'
import { useFormik } from 'formik'
import {KTCard, KTSVG} from '../../../../../_metronic/helpers'
import { getError } from '../../../../utils/helpers'
import { useState, useEffect } from 'react';
import { createSession } from './core/_request';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';
import { getTeams, getUncategorizedPlayers } from '../../uncategorized-player-management/players-assign/core/_request';

const initialValues: { name: string, type: string, location: string, date: string, notes?: string, price: string | number, teams: {value: string, label: string}[], players?: {value: string, label: string}[] } = {
  name: '',
  type: '',
  location: '',
  date: '',
  price: '',
  notes: '',
  teams: [],
  players: []
}

const SessionsCreate = () => {

  const [loading, setLoading] = useState(false)
  const navigation = useNavigate()
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, {setStatus, setSubmitting, setFieldError, setFieldValue}) => {
      try {
        setLoading(true)
        await createSession({
          date: values.date,
          location: values.location,
          name: values.name,
          price: values.price,
          notes: values.notes,
          type: values.type,
          teams: values.teams.map(team => team.value),
          players: values?.players?.map(player => player.value) || undefined
        })
        setLoading(false)
      } catch (error: any) {
        if(error?.response?.status === 422 && error?.response?.data?.errors) {
          error.response.data.errors.map((e: any) => setFieldError(e.field, getError(error.response.data.errors, e.field)))
        }
        if(error?.response?.data?.message) {
          setStatus(error.response.data.message)
        } else {
          setStatus('The session details is incorrect')
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
      navigation('/session-management/sessions')
    })
  }

  const onSaveAndCreateNew = (e: any) => {
    e?.preventDefault()
    formik.submitForm().then(() => {
      formik.resetForm()
    })
  }

  const loadOptionsPlayers: LoadOptions<{value: string, label: string}, any, any> =  async (search, loadedOptions, { page }) => {

    const response = await getUncategorizedPlayers(search, page);
  
    return {
      options: response.data.data.map((data: any) => ({value: data.id, label: data.first_name + ' ' + data.last_name})),
      hasMore: response.data.meta.next_page_url ? true : false,
      additional: {
        page: page + 1,
      },
      ...loadedOptions
    };
  }

  const loadOptions: LoadOptions<{value: string, label: string}, any, any> =  async (search, loadedOptions, { page }) => {

    const response = await getTeams(search, page);
  
    return {
      options: response.data.data.map((data: any) => ({value: data.id, label: `${data.name} (${data.league})`})),
      hasMore: response.data.meta.next_page_url ? true : false,
      additional: {
        page: page + 1,
      },
      ...loadedOptions
    };
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
                Create Session
              </h3>
          </div>
          <div className="card-body">
              {formik.status && (
                <div className='mb-lg alert alert-danger'>
                  <div className='alert-text font-weight-bold'>{formik.status}</div>
                </div>
              )}

              {/* begin::Form group First Name */}
              <div className='fv-row mb-5'>
                <label className='form-label fw-bolder text-dark fs-7 required'>Session Name</label>
                <input
                  placeholder='Session Name'
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

              {/* begin::Form group First Name */}
              <div className='fv-row mb-5'>
                <label className='form-label fw-bolder text-dark fs-7 required'>Session Type</label>
                <select
                  {...formik.getFieldProps('type')}
                  className={clsx(
                    'form-control form-control-lg form-control fs-7',
                    {'is-invalid': formik.touched.type && formik.errors.type},
                    {
                      'is-valid': formik.touched.type && !formik.errors.type,
                    }
                  )}
                >
                  <option value="game">Game</option>
                  <option value="training">Training</option>
                </select>
                {formik.touched.type && formik.errors.type && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.type}</span>
                    </div>
                  </div>
                )}
              </div>
              {/* end::Form group */}

              {/* begin::Form group Date */}
              <div className='fv-row mb-5'>
                <label className='form-label fw-bolder text-dark fs-7 required'>Date</label>
                <input
                  placeholder='Date'
                  type='date'
                  autoComplete='off'
                  {...formik.getFieldProps('date')}
                  className={clsx(
                    'form-control form-control-lg form-control fs-7',
                    {'is-invalid': formik.touched.date && formik.errors.date},
                    {
                      'is-valid': formik.touched.date && !formik.errors.date,
                    }
                  )}
                />
                {formik.touched.date && formik.errors.date && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.date}</span>
                    </div>
                  </div>
                )}
              </div>
              {/* end::Form group */}

              {/* begin::Form group Location */}
              <div className='fv-row mb-5'>
                <label className='form-label fw-bolder text-dark fs-7 required'>Location</label>
                <input
                  placeholder='Location'
                  type='text'
                  autoComplete='off'
                  {...formik.getFieldProps('location')}
                  className={clsx(
                    'form-control form-control-lg form-control fs-7',
                    {'is-invalid': formik.touched.location && formik.errors.location},
                    {
                      'is-valid': formik.touched.location && !formik.errors.location,
                    }
                  )}
                />
                {formik.touched.location && formik.errors.location && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.location}</span>
                    </div>
                  </div>
                )}
              </div>
              {/* end::Form group */}

              {/* begin::Form group Location */}
              <div className='fv-row mb-5'>
                <label className='form-label fw-bolder text-dark fs-7 required'>Price</label>
                <input
                  placeholder='price'
                  type='number'
                  step={1}
                  autoComplete='off'
                  {...formik.getFieldProps('price')}
                  className={clsx(
                    'form-control form-control-lg form-control fs-7',
                    {'is-invalid': formik.touched.price && formik.errors.price},
                    {
                      'is-valid': formik.touched.price && !formik.errors.price,
                    }
                  )}
                />
                {formik.touched.price && formik.errors.price && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.price}</span>
                    </div>
                  </div>
                )}
              </div>
              {/* end::Form group */}

              {/* begin::Form group Team */}
              <div className='fv-row mb-5'>
                <label className='form-label fw-bolder text-dark fs-7 required'>Teams</label>
                <AsyncPaginate
                    isMulti={true}
                    value={formik.values.teams}
                    loadOptions={loadOptions}
                    onChange={value => formik.setFieldValue('teams', value)}
                    additional={{
                        page: 1,
                    }}
                    debounceTimeout={300}
                    placeholder="Teams"
                    noOptionsMessage={() => "No Record Found!"}
                />
                {formik.touched.teams && formik.errors.teams && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.teams?.toString()}</span>
                    </div>
                  </div>
                )}
              </div>
              {/* end::Form group */}

              {/* begin::Form group Team */}
              <div className='fv-row mb-5'>
                <label className='form-label fw-bolder text-dark fs-7 required'>Players</label>
                <AsyncPaginate
                    isMulti={true}
                    value={formik.values.players}
                    loadOptions={loadOptionsPlayers}
                    onChange={value => formik.setFieldValue('players', value)}
                    additional={{
                        page: 1,
                    }}
                    debounceTimeout={300}
                    placeholder="Players"
                    noOptionsMessage={() => "No Record Found!"}
                />
                {formik.touched.players && formik.errors.players && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>
                      <span role='alert'>{formik.errors.players?.toString()}</span>
                    </div>
                  </div>
                )}
              </div>
              {/* end::Form group */}

              {/* begin::Form group Notes */}
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
                disabled={formik.isSubmitting}
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

export {SessionsCreate}
