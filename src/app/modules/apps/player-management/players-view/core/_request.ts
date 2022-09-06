import { ID } from "../../../../../../_metronic/helpers"
import axios from "../../../../../utils/axios"
import { Player } from "../../players-list/core/_models"


const API_URL = process.env.REACT_APP_API_URL

const PLAYER_URL = `${API_URL}/player`
const PLAYER_REQUEST_FROM = `${API_URL}/player_request`

export async function getPlayer(id: string | number) {
    const response = await axios.get<Player>(PLAYER_URL + '/' + id)
    return response.data
}

export async function sendPlayerInformationFormRequest(data: { player: ID }) {
    return axios.post(PLAYER_REQUEST_FROM, data)
}