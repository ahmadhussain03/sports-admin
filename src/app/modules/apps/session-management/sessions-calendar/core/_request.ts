import axios from "../../../../../utils/axios"
import { Session } from "../../sessions-list/core/_models"


const API_URL = process.env.REACT_APP_API_URL

const SESSION_URL = `${API_URL}/session/upcoming`

export async function getUpcomingSessions() {
    const response = await axios.get<Session[]>(SESSION_URL)
    return response.data
}