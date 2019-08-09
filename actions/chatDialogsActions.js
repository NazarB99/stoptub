import {FETCH_DIALOGS, ADD_DIALOG, SORT_DIALOGS} from './type/types'

export const fetchDialogs = dialogs => ({type: FETCH_DIALOGS, dialogs})
export const addNewDialog = dialog => ({type: ADD_DIALOG, dialog})
export const sortDialogs = (message, count) => ({type: SORT_DIALOGS, message, count})
