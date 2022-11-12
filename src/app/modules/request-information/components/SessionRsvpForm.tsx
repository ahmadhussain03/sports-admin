/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { PasswordMeterComponent } from '../../../../_metronic/assets/ts/components'
import { useAuth } from '../../auth/core/Auth'
import { getError } from '../../../utils/helpers'
import { useNavigate } from 'react-router-dom';
import { registerInformation, validateCode, verifyPlayer } from '../core/_request'
import { toast } from 'react-toastify';
import { ID, toAbsoluteUrl } from '../../../../_metronic/helpers'
import { getSession } from './../core/_request';
import { Session } from '../../apps/session-management/sessions-list/core/_models'
import { Player } from '../../apps/player-management/players-list/core/_models'
import { markAttendance } from './../core/_request';

const initialValues = {
    email: '',
    firstName: '',
    lastName: ''
}

export function SessionRsvpForm() {
    const [loading, setLoading] = useState(false)
    const [isPlayerVerified, setPlayerVerified] = useState<boolean>(false)
    const [isCompleted, setIsCompleted] = useState<boolean>(false)
    const [sessions, setSessions] = useState<Session[]>([])

    const formik = useFormik({
        initialValues,
        onSubmit: async (values, { setStatus, setSubmitting, setFieldError }) => {
            setLoading(true)
            try {

                const response = await verifyPlayer({
                    ...values
                })
                setPlayerVerified(true)
                setSessions(response.data)
                toast.success('Player Verified Successfully.')
                setStatus('')
                setLoading(false)
            } catch (error: any) {
                if (error.response?.data?.message)
                    toast.error(error.response.data.message)
                if (error?.response?.status === 422 && error?.response?.data?.errors) {
                    error.response.data.errors.map((e: any) => setFieldError(e.field, getError(error.response.data.errors, e.field)))
                }
                if (error?.response?.data?.message) {
                    setStatus(error.response.data.message)
                } else {
                    setStatus('The registration details is incorrect')
                }
                setSubmitting(false)
                setLoading(false)
            }
        },
    })

    const markRsvp = async ({ attendance, session }: { attendance: boolean, session: number }) => {
        setLoading(true)
        try {
            await markAttendance({ ...formik.values, sessionId: session, attendance: attendance })
            setSessions(sesses => {
                const updatedSessions = sesses.filter(sess => sess.id !== session)
                if(updatedSessions.length === 0) setIsCompleted(true)
                return updatedSessions
            })
            toast.success('Attendance Marked Successfully.')
        } catch (e) {
            toast.error('Something Went Wrong!')
        } finally {
            setLoading(false)
        }
    }

    if (isCompleted) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center">
                <img
                    alt='Logo'
                    src={toAbsoluteUrl('/media/logos/default.png')}
                    className='h-350px'
                />
                <div className='mb-lg-15 alert alert-success'>
                    <div className='alert-text font-weight-bold'>Attendance Marked Successfully.</div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <form
                className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
                noValidate
                onSubmit={formik.handleSubmit}
            >
                {/* begin::Heading */}
                <div className='mb-10 text-center'>
                    {/* begin::Title */}
                    <h1 className='text-dark mb-3'>RSVP Session</h1>
                    {/* end::Title */}
                </div>
                {/* end::Heading */}

                {formik.status && (
                    <div className='mb-lg-15 alert alert-danger'>
                        <div className='alert-text font-weight-bold'>{formik.status}</div>
                    </div>
                )}

                {!isPlayerVerified && (
                    <>
                        <div className='fv-row mb-7'>
                            <label className='form-label fw-bolder text-dark fs-6'>Email</label>
                            <input
                                placeholder='Email'
                                type='text'
                                autoComplete='off'
                                {...formik.getFieldProps('email')}
                                className={clsx(
                                    'form-control form-control-lg form-control-solid',
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

                        {/* begin::Form group */}
                        <div className='text-center'>
                            <button
                                type='submit'
                                id='kt_sign_up_submit'
                                className='btn btn-lg btn-primary w-100 mb-5'
                                disabled={formik.isSubmitting || !formik.isValid}
                            >
                                {!loading && <span className='indicator-label'>Verify</span>}
                                {loading && (
                                    <span className='indicator-progress' style={{ display: 'block' }}>
                                        Please wait...{' '}
                                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                    </span>
                                )}
                            </button>
                        </div>
                        {/* end::Form group */}
                    </>
                )
                }
                {!!isPlayerVerified && (
                    <>
                        {/* begin::Form group Email */}
                        <div className='fv-row mb-7'>
                            <label className='form-label fw-bolder text-dark fs-6'>Email</label>
                            <h3>{formik.values.email}</h3>
                        </div>
                        {/* end::Form group */}
                        {/* begin::Form group Email */}
                        <div className='fv-row mb-7'>
                            <label className='form-label fw-bolder text-dark fs-6'>First Name</label>
                            <h3>{formik.values.firstName}</h3>
                        </div>
                        {/* end::Form group */}
                        {/* begin::Form group Email */}
                        <div className='fv-row mb-7'>
                            <label className='form-label fw-bolder text-dark fs-6'>Last Name</label>
                            <h3>{formik.values.lastName}</h3>
                        </div>
                        {/* end::Form group */}
                        {/* begin::Form group Email */}
                        <table style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Date</th>
                                    <th>Confirm</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sessions.map(session => (
                                    <tr key={session.id}>
                                        <td>{ session.name }</td>
                                        <td>{ session.type }</td>
                                        <td>{ session.date }</td>
                                        <td>
                                            <div className='d-flex items-center'>
                                                <a style={{ cursor: 'pointer' }} onClick={() => markRsvp({ attendance: true, session: session.id })} className="btn btn-icon btn-success btn-sm mx-2">
                                                    {!loading && <i className="fa fa-check fs-2"></i>}
                                                    {!!loading && (
                                                        <span className='indicator-progress' style={{ display: 'block' }}>
                                                            <span className='spinner-border spinner-border-sm align-middle'></span>
                                                        </span>
                                                    )}
                                                </a>
                                                <a style={{ cursor: 'pointer' }} onClick={() => markRsvp({ attendance: false, session: session.id })} className="btn btn-icon btn-success btn-sm mx-2">
                                                    {!loading && <i className="fa fa-remove fs-2"></i>}
                                                    {!!loading && (
                                                        <span className='indicator-progress' style={{ display: 'block' }}>
                                                            <span className='spinner-border spinner-border-sm align-middle'></span>
                                                        </span>
                                                    )}
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* end::Form group */}
                    </>
                )}
            </form >
        </div >
    )
}
