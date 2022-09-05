import {useEffect} from 'react'
import {useIntl} from 'react-intl'
import { KTCard, KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import { useNavigate } from 'react-router-dom';
import { useUpcomingSession } from '../../modules/apps/session-management/sessions-calendar/core/_hook';
import FullCalendar, { EventClickArg } from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'

const DashboardPage = () => {

  const navigation = useNavigate()

  const { data, isLoading } = useUpcomingSession()

  useEffect(() => {
    // We have to show toolbar only for dashboard page
    document.getElementById('kt_layout_toolbar')?.classList.remove('d-none')
    return () => {
      document.getElementById('kt_layout_toolbar')?.classList.add('d-none')
    }
  }, [])

  if(isLoading) {
      return (
          <div className="d-flex flex-column justify-content-center align-items-center">
              <img
                alt='Logo'
                src={toAbsoluteUrl('/media/logos/default.png')}
                className='h-350px'
              />
              Loading...
          </div>
      )
  }

  return (
    <>
      {/* begin::Row  */}
      {/* <div className='row g-5 g-xl-8'> */}
        {/* begin::Col  */}
        {/* <div className='col-xxl-4'>
          <MixedWidget8 className='card-xxl-stretch' chartColor='warning' chartHeight='150px' />
        </div> */}
        {/* end::Col  */}
        {/* begin::Col  */}
        {/* <div className='col-xxl-8'>
          <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' />
        </div> */}
        {/* end::Col  */}
      {/* </div> */}
      {/* end::Row  */}
      
      <KTCard>
       <div className="card-body">
        <FullCalendar
              plugins={[ dayGridPlugin ]}
              initialView="dayGridMonth"
              // eventClick={handleEventClick}
              events={data?.map(session => ({ title: session.name, date: session.date, id: session.id.toString() }))}
          />
       </div>
      </KTCard>
           
      <div className="separator my-5"></div>

      <div className={`card card-xl-stretch mb-xl-12`}>
        {/* begin::Header */}
        <div className={`card-header border-0 py-20 bg-info`}>
          <h3 className='card-title fw-bold text-white'>Dashboard</h3>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body p-0'>
          {/* begin::Stats */}
          <div className='card-p mt-n20 position-relative'>
            {/* begin::Row */}
            <div className='row g-0'>
              {/* begin::Col */}
              <a onClick={() => navigation('/player-management/players')} className='col bg-light-warning px-6 py-8 rounded-2 me-7 mb-7' style={{cursor: 'pointer'}}>
                <KTSVG
                  path='/media/icons/duotune/communication/com013.svg'
                  className='svg-icon-3x svg-icon-warning d-block my-2'
                />
                <span className='text-warning fw-semibold fs-6'>
                  Players
                </span>
              </a>
              {/* end::Col */}
              {/* begin::Col */}
              <a onClick={() => navigation('/team-management/teams')} className='col bg-light-primary px-6 py-8 rounded-2 mb-7' style={{cursor: 'pointer'}}>
                <KTSVG
                  path='/media/icons/duotune/communication/com014.svg'
                  className='svg-icon-3x svg-icon-primary d-block my-2'
                />
                <span className='text-primary fw-semibold fs-6'>
                  Teams
                </span>
              </a>
              {/* end::Col */}
            </div>
            {/* end::Row */}
            {/* begin::Row */}
            <div className='row g-0'>
              {/* begin::Col */}
              <a onClick={() => navigation('/session-management/sessions')} className='col bg-light-danger px-6 py-8 rounded-2 me-7' style={{cursor: 'pointer'}}>
                <KTSVG
                  path='/media/icons/duotune/maps/map001.svg'
                  className='svg-icon-3x svg-icon-danger d-block my-2'
                />
                <span className='text-danger fw-semibold fs-6 mt-2'>
                  Sessions
                </span>
              </a>
              {/* end::Col */}
              {/* begin::Col */}
              <a onClick={() => navigation('/user-management/users')} className='col bg-light-success px-6 py-8 rounded-2' style={{cursor: 'pointer'}}>
                <KTSVG
                  path='/media/icons/duotune/communication/com006.svg'
                  className='svg-icon-3x svg-icon-success d-block my-2'
                />
                <span className='text-success fw-semibold fs-6 mt-2'>
                  Users
                </span>
              </a>
              {/* end::Col */}
            </div>
            {/* end::Row */}
          </div>
          {/* end::Stats */}
        </div>
        {/* end::Body */}
      </div>
    </>
  )
}

const DashboardWrapper = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
