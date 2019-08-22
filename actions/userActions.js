/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import {BASE_URL} from '../config/Constants'

import {FETCH_USER, SET_LOADING, GET_SCHEDULE, SET_SCHEDULE} from './type/types'

export const login = (username, password) => async dispatch => {
  dispatch({type: SET_LOADING})
  const response = await fetch(`${BASE_URL}/get_user?login=${username}&password=${password}`)
  const user = await response.json()
  console.log(user)

  dispatch({type: FETCH_USER, payload: user})
}

export const getUsersSchedule = token => async dispatch => {
  dispatch({type: SET_LOADING})
  const response = await fetch(`${BASE_URL}/get_schedule`, {
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
  const schedule = await response.json()
  console.log(schedule)

  dispatch({type: GET_SCHEDULE, payload: schedule})
}

export const markAsDone = (task_id, token) => async dispatch => {
  console.log('DONE')
  console.log(task_id)
  dispatch({type: SET_LOADING})
  const response = await fetch(`${BASE_URL}/set_schedule_task_done`, {
    method: 'POST',
    headers: new Headers({
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      task_id,
    }),
  })
  const schedule = await response.json()
  console.log(schedule)

//   dispatch({type: SET_SCHEDULE, payload: schedule})
}
