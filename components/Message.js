/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-state */
/* eslint-disable class-methods-use-this */
import React, {Component} from 'react'
import {StyleSheet, View, Text, Dimensions} from 'react-native'
import ConnectyCube from 'connectycube-reactnative'
import Icon from 'react-native-vector-icons/Ionicons'

import {MAIN_COLOR, GREY_COLOR} from '../config/Constants'

// import UserIcon from './ProfileIcon'

const fullWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  positionToLeft: {
    justifyContent: 'flex-start',
  },
  positionToRight: {
    justifyContent: 'flex-end',
  },
  message: {
    paddingTop: 5,
    paddingBottom: 3,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  messageToLeft: {
    maxWidth: fullWidth - 90,
    borderBottomLeftRadius: 2,
    backgroundColor: MAIN_COLOR,
  },
  messageToRight: {
    maxWidth: fullWidth - 55,
    borderBottomRightRadius: 2,
    backgroundColor: GREY_COLOR,
  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
  selfToLeft: {
    alignSelf: 'flex-start',
    color: 'white',
  },
  selfToRight: {
    alignSelf: 'flex-end',
    color: 'black',
  },
  dateSent: {
    alignSelf: 'flex-end',
    paddingTop: 1,
    flexDirection: 'row',
  },
  dateSentText: {
    fontSize: 12,
  },
})

export default class Message extends Component {
  state = {
    delivered: false,
    read: false,
  }

  componentDidMount() {
    this.setMessgageListeners()
  }

  setMessgageListeners = () => {
    const {message, otherSender, user} = this.props
    if (!otherSender) {
      ConnectyCube.chat.onDeliveredStatusListener = (messageId, dialogId, userId) => {
        console.log(`delivered ${messageId}`)
        // if (message.id === messageId) {
        this.setState({delivered: true})
        // }
      }
      ConnectyCube.chat.onReadStatusListener = (messageId, dialogId, userId) => {
        console.log(`read ${messageId}`)
        // if (message.id === messageId) {
        this.setState({read: true})
        // }
      }
    }
    if (otherSender) {
      const params = {
        messageId: message.id,
        userId: user.id,
        dialogId: message.dialogId,
      }
      console.log('send read')
      ConnectyCube.chat.sendReadStatus(params)
    }
  }

  getTime(dateSent) {
    const date = dateSent ? new Date(dateSent * 1000) : new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    return `${hours > 9 ? hours : `0${hours}`}:${minutes > 9 ? minutes : `0${minutes}`}`
  }

  getStatusIcon = () => {
    const {otherSender} = this.props
    if (this.state.delivered) {
      return (
        <View style={{flexDirection: 'row'}}>
          <Icon name="ios-checkmark" color={otherSender ? 'white' : 'black'} size={10} />
          <Icon name="ios-checkmark" color={otherSender ? 'white' : 'black'} size={10} />
        </View>
      )
    }
    if (this.state.read) {
      return (
        <Icon
          color={otherSender ? 'white' : 'black'}
          name="ios-checkmark-circle-outline"
          size={10}
        />
      )
    }
    return !otherSender ? (
      <Icon color={otherSender ? 'white' : 'black'} name="ios-checkmark" size={10} />
    ) : null
  }

  render() {
    const {message, otherSender} = this.props

    return (
      <View
        style={[styles.container, otherSender ? styles.positionToLeft : styles.positionToRight]}
      >
        <View style={[styles.message, otherSender ? styles.messageToLeft : styles.messageToRight]}>
          <Text style={[styles.messageText, otherSender ? styles.selfToLeft : styles.selfToRight]}>
            {message.body || ' '}
          </Text>
          <View style={styles.dateSent}>
            <Text style={[styles.dateSentText, otherSender ? {color: 'white'} : {color: 'black'}]}>
              {this.getTime(message.date_sent)}
            </Text>
            {this.state.delivered && !this.state.read ? (
              <View style={{flexDirection: 'row'}}>
                <Icon name="ios-checkmark" color={otherSender ? 'white' : 'black'} size={12} />
                <Icon name="ios-checkmark" color={otherSender ? 'white' : 'black'} size={12} />
              </View>
            ) : null}
            {this.state.read ? (
              <Icon
                color={otherSender ? 'white' : 'black'}
                name="ios-checkmark-circle-outline"
                size={12}
              />
            ) : null}
            {!this.state.delivered && !this.state.read && !otherSender ? (
              <Icon color={otherSender ? 'white' : 'black'} name="ios-checkmark" size={12} />
            ) : null}
          </View>
        </View>
      </View>
    )
  }
}

// {/* {otherSender && ( */}
//           // <UserIcon
//           //   photo={message.sender.avatar}
//           //   name={message.sender.full_name}
//           //   iconSize="small"
//           // />
//           )}
