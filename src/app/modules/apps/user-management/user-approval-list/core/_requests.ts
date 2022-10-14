import {AxiosResponse} from 'axios'
import {ID, Response} from '../../../../../../_metronic/helpers'
import {User, UsersQueryResponse} from './_models'
import axios from '../../../../../utils/axios'

const API_URL = process.env.REACT_APP_API_URL

const USER_URL = `${API_URL}/users`
const USER_APPROVAL_URL = `${API_URL}/user_approval`

const getUsers = (query: string): Promise<UsersQueryResponse> => {
  return axios
    .get(`${USER_URL}?${query}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}


const getApprovalUsers = (query: string): Promise<UsersQueryResponse> => {
  return axios
    .get(`${USER_APPROVAL_URL}?${query}`)
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data)
}

const getUserById = (id: ID): Promise<User | undefined> => {
  return axios
    .get(`${USER_URL}/${id}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const createUser = (user: User): Promise<User | undefined> => {
  return axios
    .put(USER_URL, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateUser = (user: User): Promise<User | undefined> => {
  return axios
    .post(`${USER_URL}/${user.id}`, user)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const deleteUser = (userId: ID): Promise<void> => {
  return axios.delete(`${USER_URL}/${userId}`).then(() => {})
}

const approveUser = (userId: ID): Promise<void> => {
  return axios.put(`${USER_APPROVAL_URL}/${userId}`)
}

const rejectUser = (userId: ID): Promise<void> => {
  return axios.delete(`${USER_APPROVAL_URL}/${userId}`)
}

export {getUsers, deleteUser, getUserById, createUser, updateUser, getApprovalUsers, approveUser, rejectUser}
