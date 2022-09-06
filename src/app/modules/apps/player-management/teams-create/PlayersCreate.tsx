import clsx from 'clsx'
import { useFormik } from 'formik'
import { KTCard, KTSVG } from '../../../../../_metronic/helpers'
import { getError } from '../../../../utils/helpers'
import { useState, useEffect } from 'react';
import { createPlayer } from './core/_request';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth';
import { AsyncPaginate, LoadOptions } from 'react-select-async-paginate';
import { getTeams } from '../../uncategorized-player-management/players-assign/core/_request';

const initialValues: { team: { value: string, label: string } | null, firstName: string, lastName: string, email: string, phoneNumber: string, address: string | null, postCode: string | null, notes?: string } = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: '',
  postCode: '',
  notes: '',
  team: null
}

const PlayersCreate = () => {

  const [loading, setLoading] = useState(false)
  const navigation = useNavigate()
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, { setStatus, setSubmitting, setFieldError, setFieldValue }) => {
      try {
        setLoading(true)
        await createPlayer({
          address: values.address,
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
          postCode: values.postCode,
          notes: values.notes,
          team: values.team?.value
        })
        setLoading(false)
      } catch (error: any) {
        if (error?.response?.status === 422 && error?.response?.data?.errors) {
          error.response.data.errors.map((e: any) => setFieldError(e.field, getError(error.response.data.errors, e.field)))
        }
        if (error?.response?.data?.message) {
          setStatus(error.response.data.message)
        } else {
          setStatus('The player details is incorrect')
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
      navigation('/player-management/players')
    })
  }

  const onSaveAndCreateNew = (e: any) => {
    e?.preventDefault()
    formik.submitForm().then(() => {
      formik.resetForm()
    })
  }

  const loadOptions: LoadOptions<{ value: string, label: string }, any, any> = async (search, loadedOptions, { page }) => {

    const response = await getTeams(search, page);

    return {
      options: response.data.data.map((data: any) => ({ value: data.id, label: `${data.name} (${data.league})` })),
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
              <span style={{ cursor: 'pointer' }} onClick={() => navigation(-1)}>
                <KTSVG path='/media/icons/duotune/arrows/arr002.svg' className='svg-icon-2 me-2' />
              </span>
              Create Player
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
              <label className='form-label fw-bolder text-dark fs-7 required'>First Name</label>
              <input
                placeholder='First Name'
                type='text'
                autoComplete='off'
                {...formik.getFieldProps('firstName')}
                className={clsx(
                  'form-control form-control-lg form-control fs-7',
                  { 'is-invalid': formik.touched.firstName && formik.errors.firstName },
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

            {/* begin::Form group First Name */}
            <div className='fv-row mb-5'>
              <label className='form-label fw-bolder text-dark fs-7 required'>Last Name</label>
              <input
                placeholder='Last Name'
                type='text'
                autoComplete='off'
                {...formik.getFieldProps('lastName')}
                className={clsx(
                  'form-control form-control-lg form-control fs-7',
                  { 'is-invalid': formik.touched.lastName && formik.errors.lastName },
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

            {/* begin::Form group Email */}
            <div className='fv-row mb-5'>
              <label className='form-label fw-bolder text-dark fs-7 required'>Email</label>
              <input
                placeholder='Email'
                type='text'
                autoComplete='off'
                {...formik.getFieldProps('email')}
                className={clsx(
                  'form-control form-control-lg form-control fs-7',
                  { 'is-invalid': formik.touched.email && formik.errors.email },
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

            {/* begin::Form group Email */}
            <div className='fv-row mb-5'>
              <label className='form-label fw-bolder text-dark fs-7 required'>Phone Number</label>
              <input
                placeholder='Phone Number'
                type='text'
                autoComplete='off'
                {...formik.getFieldProps('phoneNumber')}
                className={clsx(
                  'form-control form-control-lg form-control fs-7',
                  { 'is-invalid': formik.touched.phoneNumber && formik.errors.phoneNumber },
                  {
                    'is-valid': formik.touched.phoneNumber && !formik.errors.phoneNumber,
                  }
                )}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.phoneNumber}</span>
                  </div>
                </div>
              )}
            </div>
            {/* end::Form group */}

            {/* begin::Form group Email */}
            <div className='fv-row mb-5'>
              <label className='form-label fw-bolder text-dark fs-7'>Address</label>
              <input
                placeholder='Address'
                type='text'
                autoComplete='off'
                {...formik.getFieldProps('address')}
                className={clsx(
                  'form-control form-control-lg form-control fs-7',
                  { 'is-invalid': formik.touched.address && formik.errors.address },
                  {
                    'is-valid': formik.touched.address && !formik.errors.address,
                  }
                )}
              />
              {formik.touched.address && formik.errors.address && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.address}</span>
                  </div>
                </div>
              )}
            </div>
            {/* end::Form group */}

            {/* begin::Form group Email */}
            <div className='fv-row mb-5'>
              <label className='form-label fw-bolder text-dark fs-7'>Post Code</label>
              <input
                placeholder='Post Code'
                type='text'
                autoComplete='off'
                {...formik.getFieldProps('postCode')}
                className={clsx(
                  'form-control form-control-lg form-control fs-7',
                  { 'is-invalid': formik.touched.postCode && formik.errors.postCode },
                  {
                    'is-valid': formik.touched.postCode && !formik.errors.postCode,
                  }
                )}
              />
              {formik.touched.postCode && formik.errors.postCode && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.postCode}</span>
                  </div>
                </div>
              )}
            </div>
            {/* end::Form group */}

            {/* begin::Form group Team */}
            <div className='fv-row mb-5'>
              <label className='form-label fw-bolder text-dark fs-7'>Team</label>
              <AsyncPaginate
                value={formik.values.team}
                loadOptions={loadOptions}
                onChange={value => formik.setFieldValue('team', value)}
                isClearable={true}
                additional={{
                  page: 1,
                }}
                debounceTimeout={300}
                placeholder="Team"
                noOptionsMessage={() => "No Record Found!"}
              />
              {formik.touched.team && formik.errors.team && (
                <div className='fv-plugins-message-container'>
                  <div className='fv-help-block'>
                    <span role='alert'>{formik.errors.team?.toString()}</span>
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
                  { 'is-invalid': formik.touched.notes && formik.errors.notes },
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
                  <span className='indicator-progress' style={{ display: 'block' }}>
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
                  <span className='indicator-progress' style={{ display: 'block' }}>
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

export { PlayersCreate }
