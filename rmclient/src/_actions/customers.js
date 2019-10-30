import * as types from '../_redux/types'
import axios from 'axios'
import {ip} from '../services/ip'

export const handleGetCustomers= () => ({
  type: types.GET_CUSTOMERS,
  payload: axios.get(`${ip}/customers`)
});
export const handlePostCustomers= (data) => ({
    type: types.POST_CUSTOMERS,
    payload: axios.post(`${ip}/customers`,{
      name : data.name,
      identity_number : data.identity_number,
      phone_number : data.phone_number,
      image : data.image
    })
  });

  export const handleEditCustomers= (id,data) => ({
    type: types.EDIT_CUSTOMERS,
    payload: axios.put(`${ip}/customers/${id}`,{
      name : data.name,
      identity_number : data.identity_number,
      phone_number : data.phone_number,
      image : data.image
    })
  });

  
  

