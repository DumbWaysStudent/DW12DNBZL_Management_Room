import * as types from '../_redux/types'
import axios from 'axios'
import {ip} from '../services/ip'

export const handleGetAdmins= (id) => ({
  type: types.GET_ADMINS,
  payload: axios.get(`${ip}/admins/${id}`)
});


