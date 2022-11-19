import { ID } from '../../../../_metronic/helpers';
import axios from '../../../utils/axios'
import { Player } from '../../apps/player-management/players-list/core/_models';
import { Session } from '../../apps/session-management/sessions-list/core/_models';
import { UserModel } from '../../auth/core/_models';
import { UserInformationForm } from './../../apps/user-management/users-information-list/core/_models';

const API_URL = process.env.REACT_APP_API_URL

export const USER_CODE_VALIDATION = `${API_URL}/user_request_verify`
export const USER_CODE_REGISTERATION = `${API_URL}/user_request_register`
export const PLAYER_CODE_VALIDATION = `${API_URL}/player_request_verify`
export const NEW_PLAYER_CODE_VALIDATION = `${API_URL}/new_player_request_verify`
export const PLAYER_CODE_UPDATE = `${API_URL}/player_request_update`
export const NEW_PLAYER_CODE_REGISTER = `${API_URL}/new_player_request_register`
export const SESSION_URL = `${API_URL}/session-rsvp`
export const PLAYER_VERIFY_URL = `${API_URL}/verify-player`
export const ATTENDANCE_URL = `${API_URL}/player-rsvp`

export interface RegisterInformationPayload {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    password_confirmation: string,
    code: string,
}

export interface PlayerInformationUpdatePayload {
    firstName: string,
    lastName: string,
    address?: string | null,
    postCode?: string | null,
    phoneNumber: string,
    notes?: string | null,
    code: string
}

export interface PlayerInformationRegisterPayload {
    firstName: string,
    lastName: string,
    address?: string | null,
    postCode?: string | null,
    phoneNumber: string,
    code: string
    clubId: string | number
}

export interface PlayerInformationForm {
    id: number
    player_id: number
    player?: Player
}

interface NewPlayerInformationForm {
    id: number
    email: string
    club_id: number
}

export interface VerifyPlayerPayload {
    email: string
    firstName: string
    lastName: string
}

export interface AttendancePayload {
    email: string
    firstName: string
    lastName: string
    sessionId: number
    attendance: boolean
}

export function validateCode(code: string) {
    return axios.post<UserInformationForm>(USER_CODE_VALIDATION, { code })
}

export function validatePlayerCode(code: string) {
    return axios.post<PlayerInformationForm>(PLAYER_CODE_VALIDATION, { code })
}

export function validateNewPlayerCode(code: string) {
    return axios.post<NewPlayerInformationForm>(NEW_PLAYER_CODE_VALIDATION, { code })
}

export function updatePlaterInformation(data: PlayerInformationUpdatePayload) {
    return axios.post(PLAYER_CODE_UPDATE, data)
}

export function registerPlayerInformation(data: PlayerInformationRegisterPayload) {
    return axios.post(NEW_PLAYER_CODE_REGISTER, data)
}

export function registerInformation(data: RegisterInformationPayload) {
    return axios.post<UserModel>(USER_CODE_REGISTERATION, data)
}

export function getSession(id: ID) {
    return axios.get<Session>(`${SESSION_URL}/${id}`)
}

export function verifyPlayer(data: VerifyPlayerPayload) {
    return axios.post<Session[]>(PLAYER_VERIFY_URL, data)
}

export function markAttendance(data: AttendancePayload) {
    return axios.post(ATTENDANCE_URL, data)
}
