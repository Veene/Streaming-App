import { combineReducers } from 'redux'
import authReducer from './authReducer'
import { reducer as formReducer } from 'redux-form'
import streamReducer from './streamReducer'



export default combineReducers({
  //authReducer is an object with a key of isSignedIn
  auth: authReducer,
  //form: reducer coming from redux-form library
  form: formReducer,
  streams: streamReducer
})