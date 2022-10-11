
import { useEffect } from 'react';

const APP_URL = process.env.REACT_APP_APP_URL

export function GoogleCallback() {

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

      const responseJson = await response.json()

      console.log(responseJson)
    } catch(e) {
      console.error(e)
    }
  }

  useEffect(() => {
    authenticateUser()
  }, []);

  return null;
}
