/* eslint-disable no-unused-expressions */
/* eslint-disable import/named */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-new */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prefer-stateless-function */
import React, {Component} from 'react'
import {View, AppState, ActivityIndicator, Alert, PermissionsAndroid, FlatList} from 'react-native'
import {Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ConnectyCube from 'connectycube-reactnative'
import {connect} from 'react-redux'
// import Accordion from 'react-native-collapsible/Accordion';

import {MAIN_COLOR, GREY_COLOR} from '../config/Constants'
import Card from '../components/Card'
import appConfig from '../app.json'
import Message from '../models/Message'
import User from '../config/UserConfig'
import Chat from '../config/ChatConfig'
import CallingService from '../config/CallingConfig'
// import PushNotificationService from '../config/PushNotificationConfig'
import {userLogin} from '../actions/chatUserActions'
import {fetchDialogs, sortDialogs} from '../actions/chatDialogsActions'
import {chatConnected, chatDisconnected} from '../actions/chatConnectionActions'
import {pushMessage} from '../actions/chatMessagesActions'
import {getUsersSchedule, markAsDone} from '../actions/userActions'
import {
  videoSessionObtained,
  userIsCalling,
  callInProgress,
  remoteVideoStreamObtained,
  localVideoStreamObtained,
  clearVideoSession,
  clearVideoStreams,
  setMediaDevices,
  setActiveVideoDevice,
} from '../actions/chatVideoActions'

class MainScreen extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('title') || '',
    headerStyle: {
      backgroundColor: MAIN_COLOR,
    },
    headerTitleStyle: {
      color: GREY_COLOR,
    },
  })

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
    this.setState({loading: true})
    ConnectyCube.init(...appConfig.connectyCubeConfig)

    User.autologin()
      .then(this.props.userLogin)
      .catch(() => this.signIn('meils', 'meils@example.com', '111bf0e2da9528865a7b2cf46a6d113d'))
  }

  // async componentDidMount() {
  //   try {
  //     const camera = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
  //       title: 'Cool Photo App Camera Permission',
  //       message:
  //         'Cool Photo App needs access to your camera ' + 'so you can take awesome pictures.',
  //       buttonNeutral: 'Ask Me Later',
  //       buttonNegative: 'Cancel',
  //       buttonPositive: 'OK',
  //     })
  //     const mic = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
  //       title: 'Cool Photo App Camera Permission',
  //       message:
  //         'Cool Photo App needs access to your camera ' + 'so you can take awesome pictures.',
  //       buttonNeutral: 'Ask Me Later',
  //       buttonNegative: 'Cancel',
  //       buttonPositive: 'OK',
  //     })

  //     if (camera === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can use the camera')
  //     } else if (mic === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can use the mic')
  //     } else {
  //       console.log('Camera permission denied')
  //     }
  //   } catch (err) {
  //     console.warn(err)
  //   }
  // }

  componentWillReceiveProps(props) {
    this._connect(props)
    // if (props.current_user && props.current_user.user.token) {
    //   this.props.getUsersSchedule(props.current_user.user.token)
    // }
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
          this.setState({loading: false})
          if (props.current_user && props.current_user.user.token) {
            this.props.getUsersSchedule(props.current_user.user.token)
          }
          props.navigation.setParams({
            title: `${props.current_user.user.firstname} ${props.current_user.user.lastname}`,
          })
        })
        .catch(e => alert(`Error.\n\n${JSON.stringify(e)}`))
        .then(() => this.setState({waitConnect: false}))

      // new PushNotificationService(this.onNotificationListener.bind(this))
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
    ConnectyCube.videochat.onCallListener = this.onCallListener.bind(this)
    ConnectyCube.videochat.onUserNotAnswerListener = this.onUserNotAnswerListener.bind(this)
    ConnectyCube.videochat.onAcceptCallListener = this.onAcceptCallListener.bind(this)
    ConnectyCube.videochat.onRemoteStreamListener = this.onRemoteStreamListener.bind(this)
    ConnectyCube.videochat.onRejectCallListener = this.onRejectCallListener.bind(this)
    ConnectyCube.videochat.onStopCallListener = this.onStopCallListener.bind(this)
    ConnectyCube.videochat.onSessionConnectionStateChangedListener = this.onSessionConnectionStateChangedListener.bind(
      this
    )
  }

  onCallListener(session, extension) {
    console.log('onCallListener, extension: ', extension)

    const {
      videoSessionObtained,
      setMediaDevices,
      localVideoStreamObtained,
      callInProgress,
    } = this.props

    videoSessionObtained(session)

    Alert.alert(
      'Incoming call',
      'from user',
      [
        {
          text: 'Accept',
          onPress: () => {
            console.log('Accepted call request')

            CallingService.getVideoDevices().then(setMediaDevices)

            CallingService.getUserMedia(session).then(stream => {
              localVideoStreamObtained(stream)
              CallingService.acceptCall(session)
              callInProgress(true)
            })
          },
        },
        {
          text: 'Reject',
          onPress: () => {
            console.log('Rejected call request')
            CallingService.rejectCall(session)
          },
          style: 'cancel',
        },
      ],
      {cancelable: false}
    )
  }

  onUserNotAnswerListener(session, userId) {
    CallingService.processOnUserNotAnswer(session, userId)

    this.props.userIsCalling(false)
  }

  onAcceptCallListener(session, userId, extension) {
    try {
      CallingService.processOnAcceptCallListener(session, extension)
    } catch (err) {
      console.warn(err)
    }
    this.props.callInProgress(true)
  }

  onRemoteStreamListener(session, userID, remoteStream) {
    this.props.remoteVideoStreamObtained(remoteStream, userID)
    this.props.userIsCalling(false)
    this.props.navigation.navigate('Video')
  }

  onRejectCallListener(session, userId, extension) {
    CallingService.processOnRejectCallListener(session, extension)

    this.props.userIsCalling(false)

    this.props.clearVideoSession()
    this.props.clearVideoStreams()
  }

  onStopCallListener(session, userId, extension) {
    this.props.userIsCalling(false)
    this.props.callInProgress(false)

    this.props.clearVideoSession()
    this.props.clearVideoStreams()

    CallingService.processOnStopCallListener(session, extension)
  }

  onSessionConnectionStateChangedListener(session, userID, connectionState) {
    console.log('onSessionConnectionStateChangedListener', userID, connectionState)
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

  markTaskAsDone = (id, title) => {
    const {token} = this.props.current_user.user

    Alert.alert('Отметить как сделаное?', `Отметить ${title} как сделаное?`, [
      {
        text: 'Да',
        onPress: () => {
          this.props.markAsDone(id, token)
          this.props.getUsersSchedule(token)
        },
      },
      {text: 'Нет', style: 'cancel'},
    ])
  }

  getNotCompleted = () => this.props.current_user.schedules.filter(item => item.is_done !== true)

  renderItem = item => (
    <Card markDone={() => this.markTaskAsDone(item.id, item.title)} schedule={item} />
  )

  render() {
    return this.state.loading || this.props.current_user.loading ? (
      <View
        style={{
          flex: 1,
          paddingLeft: 10,
          paddingRight: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator color={MAIN_COLOR} size="large" />
      </View>
    ) : (
      <View style={{flex: 1, paddingLeft: 10, paddingRight: 10}}>
        <FlatList
          data={this.getNotCompleted()}
          extraData={this.props.current_user.schedules}
          keyExtractor={item => item.id}
          renderItem={({item}) => this.renderItem(item)}
          showsVerticalScrollIndicator={false}
        />
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
  current_user: state.user,
})

const mapDispatchToProps = dispatch => ({
  chatConnected: () => dispatch(chatConnected()),
  chatDisconnected: () => dispatch(chatDisconnected()),
  userLogin: user => dispatch(userLogin(user)),
  fetchDialogs: dialogs => dispatch(fetchDialogs(dialogs)),
  sortDialogs: (message, count) => dispatch(sortDialogs(message, count)),
  pushMessage: message => dispatch(pushMessage(message)),
  videoSessionObtained: videoSession => dispatch(videoSessionObtained(videoSession)),
  userIsCalling: isCalling => dispatch(userIsCalling(isCalling)),
  callInProgress: inProgress => dispatch(callInProgress(inProgress)),
  remoteVideoStreamObtained: remoteStream => dispatch(remoteVideoStreamObtained(remoteStream)),
  localVideoStreamObtained: localStream => dispatch(localVideoStreamObtained(localStream)),
  clearVideoSession: () => dispatch(clearVideoSession()),
  clearVideoStreams: () => dispatch(clearVideoStreams()),
  setMediaDevices: mediaDevices => dispatch(setMediaDevices(mediaDevices)),
  setActiveVideoDevice: videoDevice => dispatch(setActiveVideoDevice(videoDevice)),
  getUsersSchedule: token => dispatch(getUsersSchedule(token)),
  markAsDone: (id, token) => dispatch(markAsDone(id, token)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainScreen)
