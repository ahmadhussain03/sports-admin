import axios from "../../../utils/axios"
import { UserModel } from "../../auth"

const API_URL = process.env.REACT_APP_API_URL

export const CREATE_CLUB = `${API_URL}/club`
export const JOIN_CLUB = `${API_URL}/join_club`

export interface CreateClubPayload {
  clubName: string,
  clubCode: string,
}

export interface JoinClubPayload {
  clubCode: string,
  role: string
}

export function createClub(data: CreateClubPayload) {
  return axios.post<UserModel>(CREATE_CLUB, data)
}

export function joinClub(data: JoinClubPayload) {
  return axios.post<UserModel>(JOIN_CLUB, data)
}