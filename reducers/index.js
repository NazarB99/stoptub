import chatConnectionReducer from './chatConnectionReducer'
import chatDialogsReducer from './chatDialogsReducer'
import chatMessagesReducer from './chatMessagesReducer'
import chatSelectedReducer from './chatSelectedReducer'
import chatUserReducer from './chatUserReducer'

export default {
  chat_connection: chatConnectionReducer,
  chat_dialog: chatDialogsReducer,
  chat_messages: chatMessagesReducer,
  chat_selected: chatSelectedReducer,
  chat_user: chatUserReducer,
}
