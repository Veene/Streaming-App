import {CREATE_STREAM, FETCH_STREAM, FETCH_STREAMS, EDIT_STREAM, DELETE_STREAM} from '../actions/types'
import _ from 'lodash'

export default (state={}, action) => {
  switch(action.type){
    case CREATE_STREAM:
      return {...state, [action.payload.id]: action.payload}
    case FETCH_STREAM:
      return {...state, [action.payload.id]: action.payload}
    case EDIT_STREAM:
      return {...state, [action.payload.id]: action.payload}
    case FETCH_STREAMS:
      //making state into a new object as req. then using lodash to map keys to each object using the action.payload.id
      //everytime we fetch anything from the axios.get/put/etc we grab the db.json objects, in fetch streams, we are grabbing all of them
      //so ...state starts at 0, if we attach all the action.payload objects from db.json, it will have to automatically give them keys
      //so it would give 0: first one with id:1, 1: second one etc. basically this is separate from the axios.get and db.json, in this
      //state of streams we want to keep them indexed
      return {...state, ..._.mapKeys(action.payload, 'id')}
    case DELETE_STREAM:
      //only action.payload because DELETE_STREAM gets called with just an id, so the payload is the id
      return _.omit(state, action.payload) 
    default:
      return state
  }
}