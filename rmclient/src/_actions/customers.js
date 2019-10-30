import * as types from '../_redux/types'
import axios from 'axios'
import {ip} from '../services/ip'

const createFormData = (photo, body) => {
  const data = new FormData();
  data.append('image', {
    name: photo.fileName,
    type: photo.type,
    uri:
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  })
  Object.keys(body).forEach(key => {
    data.append(key, body[key])
  })
  console.log('data' ,data)
  return data
}

export const handleGetCustomers= () => ({
  type: types.GET_CUSTOMERS,
  payload: axios.get(`${ip}/customers`)
});
export const handlePostCustomers= (photo,data) => ({
    type: types.POST_CUSTOMERS,
    payload: axios.post(`${ip}/customers`,createFormData(photo,{
      name : data.name,
      identity_number : data.identity_number,
      phone_number : data.phone_number,
     // image : data.image
    }))
  });

  export const handleEditCustomers= (id,photo,data) => ({
    type: types.EDIT_CUSTOMERS,
    payload: axios.put(`${ip}/customers/${id}`,createFormData(photo,{
      name : data.name,
      identity_number : data.identity_number,
      phone_number : data.phone_number,
      
    }))
  });

  
  

