/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import { Navigate } from 'react-router-dom';
import { UserInformationForm } from './components/UserInformationForm';
import { PlayerInformationForm } from './components/PlayerInformationForm';
import { SessionRsvpForm } from './components/SessionRsvpForm';
import { useNavigate } from 'react-router-dom';

const RequestInformationLayout = () => {

    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('bg-body')
        return () => {
            document.body.classList.remove('bg-body')
        }
    }, [])

    return (
        <div
            className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
            style={{
                backgroundImage: `url(${toAbsoluteUrl('/media/illustrations/dozzy-1/14.png')})`,
            }}
        >
            {/* begin::Content */}
            <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
                {/* begin::Logo */}
                <a href='#' className='mb-12'>
                    <img alt='Logo' src={toAbsoluteUrl('/media/logos/default-1.png')} className='h-125px' />
                </a>
                {/* end::Logo */}
                {/* begin::Wrapper */}
                <div className='w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto'>
                    <Outlet />
                </div>
                {/* end::Wrapper */}
            </div>
            {/* end::Content */}
            {/* begin::Footer */}
            <div className='d-flex flex-center flex-column-auto p-10'>
                <div className='d-flex align-items-center fw-bold fs-6'>
                    <a href='/' onClick={() => navigate('/')} className='text-muted text-hover-primary px-2'>
                        Home
                    </a>
                </div>
            </div>
            {/* end::Footer */}
        </div>
    )
}

const RequestInformationPage = () => (
    <Routes>
        <Route element={<RequestInformationLayout />}>
            <Route path='user-information-form' element={<UserInformationForm />} />
            <Route path='player-information-form' element={<PlayerInformationForm />} />
            <Route path='session' element={<SessionRsvpForm />} />
            <Route path='*' element={<Navigate to="/error/404" />} />
        </Route>
    </Routes>
)

export { RequestInformationPage }
