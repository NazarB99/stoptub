import {FETCH_USER, SET_LOADING, GET_SCHEDULE} from '../actions/type/types'

const initialState = {
  user: {},
  schedules: [],
  loading: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      }
    case GET_SCHEDULE:
      return {
        ...state,
        schedules: action.payload,
        loading: false,
      }
    default:
      return state
  }
}
