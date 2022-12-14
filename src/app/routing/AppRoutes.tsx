/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import { FC } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import { PrivateRoutes } from './PrivateRoutes'
import { ErrorsPage } from '../modules/errors/ErrorsPage'
import { Logout, AuthPage, useAuth } from '../modules/auth'
import { App } from '../App'
import { EmailPage } from '../modules/email'
import { RequestInformationPage } from '../modules/request-information/RequestInformationPage'
import { ClubPage } from '../modules/club'
import { ApprovalPages } from '../modules/approval'

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { PUBLIC_URL } = process.env

const AppRoutes: FC = () => {
  const { currentUser } = useAuth()

  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />
          <Route path='logout' element={<Logout />} />
          <Route path='request/*' element={<RequestInformationPage />} />
          {currentUser ? (
            !!currentUser.club_id ? (
              !!currentUser.account_verified_at ? (
                !!currentUser.email_verified_at ? (
                  <>
                    <Route path='/*' element={<PrivateRoutes />} />
                    <Route index element={<Navigate to='/dashboard' />} />
                  </>
                ) : (
                  <>
                    <Route path='email_verification/*' element={<EmailPage />} />
                    <Route path='*' element={<Navigate to='/email_verification' />} />
                  </>
                )
              ) : (
                <>
                  <Route path='approval/*' element={<ApprovalPages />} />
                  <Route path='*' element={<Navigate to='/approval' />} />
                </> 
              )
            ) : (
              <>
                <Route path='club/*' element={<ClubPage />} />
                <Route path='*' element={<Navigate to='/club' />} />
              </>
            )
          ) : (
            <>
              <Route path='auth/*' element={<AuthPage />} />
              <Route path='*' element={<Navigate to='/auth' />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export { AppRoutes }
