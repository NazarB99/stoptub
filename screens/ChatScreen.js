/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React, {Component} from 'react'
import {Text} from 'react-native'
import {connect} from 'react-redux'

import User from '../config/UserConfig'
import {userLogin} from '../actions/chatUserActions'

import DialogsScreen from './DialogsScreen'

class ChatScreen extends Component {
  componentWillMount() {
    this.signIn('user1', 'email1@email.com', '1234567890')
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

  render() {
    return <DialogsScreen />
  }
}

const mapStateToProps = state => ({
  chat_user: state.chat_user,
})

export default connect(
  mapStateToProps,
  {userLogin}
)(ChatScreen)
