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
    case `${types.GET_ORDERS}_PENDING`:
    case `${types.POST_ORDERS}_PENDING`:
    case `${types.POST_ROOMS}_PENDING`:  
    case `${types.EDIT_ROOMS}_PENDING`:  
    case `${types.EDIT_ORDERS}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${types.GET_ORDERS}_FULFILLED`:
    case `${types.POST_ORDERS}_FULFILLED`:
    case `${types.EDIT_ORDERS}_FULFILLED`:
        return {
          ...state,
          isLoading: false,
          isSuccess: true,
          rooms: action.payload.data.data
        };
    case `${types.GET_ROOMS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        rooms: action.payload.data.data
      };
    case `${types.POST_ROOMS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess : true,
        rooms: state.rooms.concat(action.payload.data.data)
      }
    case `${types.EDIT_ROOMS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess : true, 
        rooms : action.payload.data.data
      }
    case `${types.GET_ROOMS}_REJECTED`:
    case `${types.GET_ORDERS}_REJECTED`:
    case `${types.POST_ORDERS}_REJECTED`:
    case `${types.EDIT_ORDERS}_REJECTED`:
    case `${types.EDIT_ROOMS}_REJECTED`:
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