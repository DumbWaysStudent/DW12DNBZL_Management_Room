import * as types from '../_redux/types'

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  rooms: []
};

export default function reducerRooms(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_ROOMS}_PENDING`:
    case `${types.POST_ROOMS}_PENDING`:  
      return {
        ...state,
        isLoading: true
      };

    case `${types.GET_ROOMS}_FULFILLED`:
     
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        rooms: action.payload.data
      };
    case `${types.POST_ROOMS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess : true,
      } 
    case `${types.GET_ROOMS}_REJECTED`:
    case `${types.POST_ROOMS}_REJECTED`:  
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
}