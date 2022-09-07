/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/core/Auth'
import { getError } from '../../../utils/helpers'
import { useNavigate } from 'react-router-dom';
import { updatePlaterInformation, validatePlayerCode } from '../core/_request'
import { toast } from 'react-toastify';
import { toAbsoluteUrl } from '../../../../_metronic/helpers'


const initialValues: { firstName: string, lastName: string, phoneNumber: string, address: string | null, postCode: string | null, notes?: string, code: string } = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
    postCode: '',
    notes: '',
    code: '',
}

export function PlayerInformationForm() {
    const [loading, setLoading] = useState(false)
    const [validating, setValidating] = useState(true)
    const [isCompleted, setIsCompleted] = useState(false)
    const navigation = useNavigate()

    const formik = useFormik({
        initialValues,
        onSubmit: async (values, { setStatus, setSubmitting, setFieldError }) => {
            setLoading(true)
            try {
                await updatePlaterInformation(values)
                toast.success('Information Updated Successfully.')
                setIsCompleted(true)
            } catch (error: any) {
                console.error(error.response)
                if (error?.response?.status === 422 && error?.response?.data?.errors) {
                    error.response.data.errors.map((e: any) => setFieldError(e.field, getError(error.response.data.errors, e.field)))
                }
                if (error?.response?.data?.message) {
                    setStatus(error.response.data.message)
                } else {
                    setStatus('The update details is incorrect')
                }
                setSubmitting(false)
                setLoading(false)
            }
        },
    })

    useEffect(() => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const code = params.get('code');

        const verify = async (code: string) => {
            try {
                const response = await validatePlayerCode(code)
                formik.setFieldValue('code', code)
                formik.setFieldValue('firstName', response.data.player?.first_name)
                formik.setFieldValue('lastName', response.data.player?.last_name)
                formik.setFieldValue('phoneNumber', response.data.player?.phone_number)
                formik.setFieldValue('address', response.data.player?.address)
                formik.setFieldValue('notes', response.data.player?.notes)
                setValidating(false)
            } catch (error: any) {
                navigation('/error/404')
            }
        }

        if (!code) {
            navigation('/error/404')
        } else {
            verify(code)
        }


    }, [])

    if (isCompleted) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center">
                <img
                    alt='Logo'
                    src={toAbsoluteUrl('/media/logos/default.png')}
                    className='h-350px'
                />
                <div className='mb-lg-15 alert alert-success'>
                    <div className='alert-text font-weight-bold'>Information Updated Successfully.</div>
                </div>
            </div>
        )
    }

    return (
        <div className={clsx({ 'overlay overlay-block': validating })}>
            <div className="overlay-layer bg-transparent"></div>
            <form
                className='form w-100 overlay-wrapper fv-plugins-bootstrap5 fv-plugins-framework'
                noValidate
                onSubmit={formik.handleSubmit}
            >
                {/* begin::Heading */}
                <div className='mb-10 text-center'>
                    {/* begin::Title */}
                    <h1 className='text-dark mb-3'>Player Information Form</h1>
                    {/* end::Title */}
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
                <div className='fv-row mb-7'>
                    <label className='form-label fw-bolder text-dark fs-6'>Phone Number</label>
                    <input
                        placeholder='Phone Number'
                        type='text'
                        autoComplete='off'
                        {...formik.getFieldProps('phoneNumber')}
                        className={clsx(
                            'form-control form-control-lg form-control-solid',
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
                <div className='fv-row mb-7'>
                    <label className='form-label fw-bolder text-dark fs-6'>Address</label>
                    <input
                        placeholder='Address'
                        type='text'
                        autoComplete='off'
                        {...formik.getFieldProps('address')}
                        className={clsx(
                            'form-control form-control-lg form-control-solid',
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
                <div className='fv-row mb-7'>
                    <label className='form-label fw-bolder text-dark fs-6'>Post Code</label>
                    <input
                        placeholder='Post Code'
                        type='text'
                        autoComplete='off'
                        {...formik.getFieldProps('postCode')}
                        className={clsx(
                            'form-control form-control-lg form-control-solid',
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

                {/* begin::Form group Email */}
                <div className='fv-row mb-7'>
                    <label className='form-label fw-bolder text-dark fs-6'>Notes</label>
                    <input
                        placeholder='Notes'
                        type='text'
                        autoComplete='off'
                        {...formik.getFieldProps('notes')}
                        className={clsx(
                            'form-control form-control-lg form-control-solid',
                            { 'is-invalid': formik.touched.notes && formik.errors.notes },
                            {
                                'is-valid': formik.touched.notes && !formik.errors.notes,
                            }
                        )}
                    />
                    {formik.touched.notes && formik.errors.notes && (
                        <div className='fv-plugins-message-container'>
                            <div className='fv-help-block'>
                                <span role='alert'>{formik.errors.notes}</span>
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
                            <span className='indicator-progress' style={{ display: 'block' }}>
                                Please wait...{' '}
                                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                            </span>
                        )}
                    </button>
                </div>
                {/* end::Form group */}
            </form>
        </div>
    )
}
