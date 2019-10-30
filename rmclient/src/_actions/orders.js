import * as types from '../_redux/types'
import axios from 'axios'
import {ip} from '../services/ip'

export const handlePostOrders= (id,duration,customer_id,order_end_time) => ({
  type: types.POST_ORDERS,
  payload: axios.post(`${ip}/checkin/room/${id}`,{
    duration : duration,
    customer_id : customer_id,
    order_end_time : order_end_time
  })
});


