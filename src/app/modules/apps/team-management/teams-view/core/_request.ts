import { ID } from "../../../../../../_metronic/helpers"
import axios from "../../../../../utils/axios"
import { Team } from "../../teams-list/core/_models"


const API_URL = process.env.REACT_APP_API_URL

const TEAM_URL = `${API_URL}/team`

export async function getTeam(id: ID) {
    const response = await axios.get<Team>(TEAM_URL + '/' + id)
    return response.data
}