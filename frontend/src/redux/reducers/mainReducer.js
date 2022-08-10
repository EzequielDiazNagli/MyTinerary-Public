import { combineReducers } from 'redux'
import citiesReducer from './citiesReducer'
import itineraryReducer from "./itineraryReducer"
import userReducer from './userReducers'

const mainReducer = combineReducers({

    citiesReducer,
    itineraryReducer,
    userReducer

})
export default mainReducer