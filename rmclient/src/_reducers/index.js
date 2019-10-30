//combine all reducer
import { combineReducers } from 'redux';




import reducerOrders from '../_reducers/orders'
import reducerRooms from '../_reducers/rooms'
import reducerCustomers from '../_reducers/customers'

//global state
const appReducer = combineReducers({
  orders : reducerOrders,
  rooms : reducerRooms,
  customers : reducerCustomers
})

export default appReducer