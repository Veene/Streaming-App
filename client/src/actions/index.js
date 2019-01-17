import streams from '../apis/stream'
import history from '../history'
import { SIGN_IN, SIGN_OUT, CREATE_STREAM, DELETE_STREAM, FETCH_STREAM, FETCH_STREAMS, EDIT_STREAM } from './types'

export const signIn = (id) => {
  return {
    type: SIGN_IN,
    payload: id
  }
}
export const signOut = () => {
  return {
    type: SIGN_OUT
  }
}

//this is redux thunk boilerplate for action creator, remember the actions creator is a function that calls function async with args 
//dispatch and getState and then automatically dispatches that inner func
export const createStream = (formValues) => async (dispatch, getState) => {
  const { id } = getState().auth
  const response = await streams.post('/streams', {...formValues, userId: id})
  dispatch({
    type: CREATE_STREAM,
    payload: response.data
  })
  //do some programmatic navigation to get the user back to root route
  history.push('/')
}

//get list of streams
export const fetchStreams = () => async dispatch => {
  const response = await streams.get('/streams')

  dispatch( { type: FETCH_STREAMS, payload: response.data})
}
//getting only 1 single stream (need to know ID)
export const fetchStream = (id) => async dispatch => {
  const response = await streams.get(`/streams/${id}`)

  dispatch( { type: FETCH_STREAM, payload: response.data})
}

export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.put(`/streams/${id}`, formValues)

  dispatch({ type: EDIT_STREAM, payload: response.data })
}

export const deleteStream = (id) => async dispatch => {
  //dont needs a repsonse because it will be empty because of delete
  await streams.delete(`/streams/${id}`)

  dispatch({ type: DELETE_STREAM, payload: id})
}