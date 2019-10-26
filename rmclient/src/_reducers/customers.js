import * as types from '../_redux/types'

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  customers: []
};

export default function reducerCustomers(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_CUSTOMERS}_PENDING`:
    case `${types.POST_CUSTOMERS}_PENDING`:  
      return {
        ...state,
        isLoading: true
      };

    case `${types.GET_CUSTOMERS}_FULFILLED`:
     
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        customers: action.payload.data
      };
    case `${types.POST_CUSTOMERS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess : true,
      } 
    case `${types.GET_CUSTOMERS}_REJECTED`:
    case `${types.POST_CUSTOMERS}_REJECTED`:  
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      return state;
  }
}