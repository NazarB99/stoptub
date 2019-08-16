import {FETCH_MESSAGES, PUSH_MESSAGE} from './type/types'

export const fetchMessages = history => {
    console.log('actionssssssss')
    console.log(history)
    return ({type: FETCH_MESSAGES, history})
}
export const pushMessage = message => ({type: PUSH_MESSAGE, message})
