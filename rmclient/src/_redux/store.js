import { createStore, combineReducers, applyMiddleware } from 'redux';

import middleware from './middleware'
import appReducer from '../_reducers/index'



const store = createStore(appReducer, {}, applyMiddleware(...middleware))



export {store}