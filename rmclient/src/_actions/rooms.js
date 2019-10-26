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


