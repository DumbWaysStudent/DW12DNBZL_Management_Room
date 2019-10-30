import * as types from '../_redux/types'
import axios from 'axios'
import {ip} from '../services/ip'

export const handleGetRooms= () => ({
  type: types.GET_ROOMS,
  payload: axios.get(`${ip}/rooms`)
});

export const handlePostRooms= (name) => ({
  type: types.POST_ROOMS,
  payload: axios.post(`${ip}/rooms`,{name : name})
});

export const handleEditRooms= (id,name) => ({
  type: types.EDIT_ROOMS,
  payload: axios.put(`${ip}/rooms/${id}`,{name : name})
});

export const handleGetOrders= () => ({
  type: types.GET_ORDERS,
  payload: axios.get(`${ip}/checkin`)
});

export const handlePostOrders= (id,duration,customer_id,order_end_time) => ({
  type: types.POST_ORDERS,
  payload: axios.post(`${ip}/checkin/room/${id}`,{
    duration : duration,
    customer_id : customer_id,
    order_end_time : order_end_time
  })
});
export const handleEditOrders= (id) => ({
  type: types.EDIT_ORDERS,
  payload: axios.put(`${ip}/checkout/${id}`)
});
