import axios from "../../../utils/axios"

const API_URL = process.env.REACT_APP_API_URL

export const RESEND_EMAIL_VERIFICATION = `${API_URL}/email-verification/resend`

export function resendEmailVerification() {
    return axios.post(RESEND_EMAIL_VERIFICATION)
}