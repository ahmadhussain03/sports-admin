import axios from "../../../../../utils/axios"
import { Player } from "../../players-list/core/_models"


const API_URL = process.env.REACT_APP_API_URL

const PLAYER_URL = `${API_URL}/player`

export async function getPlayer(id: string | number) {
    const response = await axios.get<Player>(PLAYER_URL + '/' + id)
    return response.data
}