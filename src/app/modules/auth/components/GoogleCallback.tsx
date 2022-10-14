
import { useEffect, useState } from 'react';
import { toAbsoluteUrl } from '../../../../_metronic/helpers';
import { useAuth } from '../core/Auth';

const APP_URL = process.env.REACT_APP_APP_URL

export function GoogleCallback() {

  const {saveAuth, setCurrentUser} = useAuth()
  const [error, setError] = useState('')

  const authenticateUser = async () => {
    /**
     * Construct URL for the callback route.
     */
    const url = new URL(`${APP_URL}/google/callback`)

    /**
     * Add the query provided by google.
     */
    url.search = window.location.search

    /**
     * Send the final request. You can use Axios if you want.
     */
    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        },
        credentials: 'include'
      })

      if(!response.ok) {
        const responseJson = await response.json();
        throw new Error(responseJson.message)
      }

      const responseJson = await response.json()
      saveAuth(responseJson)
      setCurrentUser(responseJson.user)
    } catch(e: any) {
      saveAuth(undefined)
      setError(e.message)
    }
  }

  useEffect(() => {
    authenticateUser()
  }, []);

  if(error) {
    return (
       <div className="alert alert-dismissible bg-light-danger border border-danger d-flex flex-column flex-sm-row p-5 mb-10">
            <div className="d-flex flex-column text-danger pe-0 pe-sm-10">
                <span>{error}</span>
            </div>
        
            <button type="button" className="position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto" data-bs-dismiss="alert">
                <span className="svg-icon svg-icon-1 svg-icon-danger">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect opacity="0.3" x="2" y="2" width="20" height="20" rx="10" fill="currentColor"/>
                        <rect x="7" y="15.3137" width="12" height="2" rx="1" transform="rotate(-45 7 15.3137)" fill="currentColor"/>
                        <rect x="8.41422" y="7" width="12" height="2" rx="1" transform="rotate(45 8.41422 7)" fill="currentColor"/>
                    </svg>
                </span>
            </button>
        </div>
    )
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
        <img
            alt='Logo'
            src={toAbsoluteUrl('/media/logos/default.png')}
            className='h-350px'
        />
         <a href='#' className='btn btn-flex flex-center btn-light btn-lg w-100 mb-5'>
            <img
              alt='Logo'
              src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
              className='h-20px me-3'
            />
            Authenticating with Google...
          </a>
    </div>
  );
}
