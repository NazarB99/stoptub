import {PUSH_USER_ID, PULL_USER_ID, CLEAR_SELECTED} from './type/types'

export const pushUserId = id => ({type: PUSH_USER_ID, userId: id})
export const pullUserId = id => ({type: PULL_USER_ID, userId: id})
export const clearSelectedUser = () => ({type: CLEAR_SELECTED})
