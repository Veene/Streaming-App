import streams from '../apis/stream'
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

//this is redux thunk boilerplate for action creator
export const createStream = (formValues) => {
  return async (dispatch) => {
    const response = await streams.post('/streams', formValues)

    //here we are directly dispatching instead of calling dispatch(action -> which returns the type:'' payload:'')
    dispatch({
      type: CREATE_STREAM,
      payload: response.data
    })
  }
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