import axios from "../../../../../utils/axios"
import { Session } from "../../sessions-list/core/_models"


const API_URL = process.env.REACT_APP_API_URL

const SESSION_URL = `${API_URL}/session`

export async function getSession(id: string | number) {
    const response = await axios.get<Session>(SESSION_URL + '/' + id)
    return response.data
}