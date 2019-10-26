import * as types from '../_redux/types'
import axios from 'axios'
import {ip} from '../services/ip'

export const handleGetOrders= () => ({
  type: types.GET_ORDERS,
  payload: axios.get(`${ip}/checkin`)
});


