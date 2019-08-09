import {FETCH_MESSAGES, PUSH_MESSAGE} from '../actions/type/types'

export default (history = [], action) => {
  switch (action.type) {
    case FETCH_MESSAGES:
      return action.history.reverse()

    case PUSH_MESSAGE:
      return [action.message, ...history]

    default:
      return history
  }
}
