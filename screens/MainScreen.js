/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-new */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prefer-stateless-function */
import React, {Component} from 'react'
import {View, Text, AppState} from 'react-native'
import {Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ConnectyCube from 'connectycube-reactnative'
import {connect} from 'react-redux'

import {MAIN_COLOR, GREY_COLOR} from '../config/Constants'
import Card from '../components/Card'
import appConfig from '../app.json'
import Message from '../models/Message'
import User from '../config/UserConfig'
import Chat from '../config/ChatConfig'
import PushNotificationService from '../config/PushNotificationConfig'
import {userLogin} from '../actions/chatUserActions'
import {fetchDialogs, sortDialogs} from '../actions/chatDialogsActions'
import {chatConnected, chatDisconnected} from '../actions/chatConnectionActions'
import {pushMessage} from '../actions/chatMessagesActions'

class MainScreen extends Component {
  static navigationOptions = {
    title: 'Aman Amanov',
    headerStyle: {
      backgroundColor: MAIN_COLOR,
    },
    headerTitleStyle: {
      color: GREY_COLOR,
    },
  }

  constructor(props) {
    super(props)

    this.state = {
      appIsActive: true,
      waitConnect: false,
      loading: false,
    }

    this.pushService
  }

  componentWillMount() {
    AppState.addEventListener('change', this._handleAppStateChange.bind(this))

    ConnectyCube.init(...appConfig.connectyCubeConfig)

    User.autologin()
      .then(this.props.userLogin)
      .catch(() => this.signIn('examplee', 'examplee@example.com', 'examplee'))
  }

  componentWillReceiveProps(props) {
    this._connect(props)
  }

  // this.signIn('examplee', 'examplee@example.com', 'examplee')

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange.bind(this))
  }

  signIn = (name, email, password) => {
    if (!name.trim() && !email.trim()) {
      alert('Warning.\n\nFill the fields to login.')
      return
    }

    User.signin({name, email, password})
      .then(this.props.userLogin)
      .catch(e => alert(`Error.\n\n${JSON.stringify(e)}`))
  }

  /*               *
   * Chat activity *
   *               */
  _handleAppStateChange(nextAppState) {
    if (nextAppState === 'active') {
      this.setState({appIsActive: true})
      this._reconnect()
    } else {
      this.setState({appIsActive: false})
      this._disconnect()
    }
  }

  _connect(props) {
    const {connected, user, chatConnected, fetchDialogs} = props
    const {waitConnect, appIsActive} = this.state

    if (appIsActive && user && !connected && !waitConnect) {
      this.setState({waitConnect: true})

      Chat.getConversations()
        .then(dialogs => {
          // Actions.dialogs()
          Chat.connect(user, dialogs)
          fetchDialogs(dialogs)
        })
        .then(() => {
          chatConnected()
          this._setupListeners()
        })
        .catch(e => alert(`Error.\n\n${JSON.stringify(e)}`))
        .then(() => this.setState({waitConnect: false}))

      new PushNotificationService(this.onNotificationListener.bind(this))
    }
  }

  _reconnect() {
    const {connected, user, chatConnected} = this.props
    const {waitConnect, appIsActive} = this.state

    if (appIsActive && user && !connected && !waitConnect) {
      this.setState({waitConnect: true})

      Chat.getConversations()
        .then(dialogs => {
          Chat.connect(user, dialogs)
          fetchDialogs(dialogs)
        })
        .then(chatConnected)
        .catch(e => alert(`Error.\n\n${JSON.stringify(e)}`))
        .then(() => this.setState({waitConnect: false}))
    }
  }

  _disconnect() {
    // this.props.chatDisconnected()
    Chat.disonnect()
  }

  // TODO:uncomment
  _setupListeners() {
    ConnectyCube.chat.onDisconnectedListener = this.props.chatDisconnected
    ConnectyCube.chat.onReconnectedListener = this.props.chatDisconnected
    ConnectyCube.chat.onMessageListener = this._onMessageListener.bind(this)
    ConnectyCube.chat.onSentMessageCallback = this._onSentMessage.bind(this)
  }

  _onMessageListener(id, msg) {
    const {user, selected, pushMessage, sortDialogs} = this.props
    const message = new Message(msg)

    if (id !== user.id) {
      if (selected.id === message.dialog_id) {
        pushMessage(message)
        sortDialogs(message)
        Chat.readMessage(message.id, message.dialog_id)
      } else {
        sortDialogs(message, true)
      }
    }
  }

  _onSentMessage(failedMessage, successMessage) {
    if (failedMessage && !successMessage) {
      console.log('Send message - FAIL')
    } else {
      console.log('Send message - SUCCESS')
    }
  }

  // TODO:uncomment
  onNotificationListener(notification) {
    Actions.dialogs()
  }

  render() {
    return (
      <View style={{flex: 1, paddingLeft: 10, paddingRight: 10}}>
        <Card />
        <Card />
        <Card />
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            right: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 9,
          }}
        >
          <Button
            buttonStyle={{
              backgroundColor: MAIN_COLOR,
              width: 60,
              height: 60,
              borderColor: '#000',
              borderRadius: 40,
            }}
            onPress={() => {
              this.props.navigation.navigate('Dialog')
            }}
            icon={<Icon name="comment-dots" size={30} color={GREY_COLOR} />}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  connected: state.chat_connection,
  user: state.chat_user,
  selected: state.chat_selected,
  dialogs: state.chat_dialogs,
})

const mapDispatchToProps = dispatch => ({
  chatConnected: () => dispatch(chatConnected()),
  chatDisconnected: () => dispatch(chatDisconnected()),
  userLogin: user => dispatch(userLogin(user)),
  fetchDialogs: dialogs => dispatch(fetchDialogs(dialogs)),
  sortDialogs: (message, count) => dispatch(sortDialogs(message, count)),
  pushMessage: message => dispatch(pushMessage(message)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen)
