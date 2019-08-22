/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prefer-stateless-function */
import React, {Component} from 'react'
import {View, Text, Image} from 'react-native'
import {Input, Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {connect} from 'react-redux'

import {login} from '../actions/userActions'

class LoginScreen extends Component {
  state = {
    username: '',
    password: '',
  }

  componentDidMount() {
    this.checkIfLoggedInAndGoToMain(this.props)
  }

  componentWillReceiveProps(props) {
    this.checkIfLoggedInAndGoToMain(props)
  }

  checkIfLoggedInAndGoToMain = state => {
    if (state.user.user && state.user.user.id) {
      state.navigation.replace('Main')
    }
  }

  onChangeText = (text, field) => {
    this.setState({[field]: text})
  }

  onButtonSubmit = () => {
    const {username, password} = this.state
    this.props.login(username, password)
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', paddingLeft: 10, paddingRight: 10}}>
        <View style={{alignItems: 'center'}}>
          <Icon name="medrt" size={50} />
        </View>
        <View>
          <Input
            autoCapitalize="none"
            placeholder="Username"
            onChangeText={text => {
              this.onChangeText(text, 'username')
            }}
          />
          <Input
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={text => {
              this.onChangeText(text, 'password')
            }}
          />
        </View>
        <Button buttonStyle={{marginTop: 10}} title="Login" onPress={this.onButtonSubmit} />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
})

export default connect(
  mapStateToProps,
  {login}
)(LoginScreen)
