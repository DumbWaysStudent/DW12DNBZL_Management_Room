import * as types from '../_redux/types'
import axios from 'axios'
import {ip} from '../services/ip'

export const handleGetCustomers= () => ({
  type: types.GET_CUSTOMERS,
  payload: axios.get(`${ip}/customers`)
});


