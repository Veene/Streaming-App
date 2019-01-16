import { combineReducers } from 'redux'
import authReducer from './authReducer'


export default combineReducers({
  //authReducer is an object with a key of isSignedIn
  auth: authReducer
})