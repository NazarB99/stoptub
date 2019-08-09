/* eslint-disable react/prefer-stateless-function */
import React, {Component} from 'react'
import {View, Text, Image} from 'react-native'
import {Input, Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'

class LoginScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', paddingLeft: 10, paddingRight: 10}}>
        <View style={{alignItems: 'center'}}>
          <Icon name="medrt" size={50} />
        </View>
        <View>
          <Input placeholder="Username" />
          <Input placeholder="Password" />
        </View>
        <Button buttonStyle={{marginTop: 10}} title="Login" />
      </View>
    )
  }
}

export default LoginScreen
