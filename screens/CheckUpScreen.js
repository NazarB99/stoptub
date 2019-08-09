/* eslint-disable react/prefer-stateless-function */
import React, {Component} from 'react'
import {View, Text} from 'react-native'
import {Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'

import {MAIN_COLOR, GREY_COLOR} from '../config/Constants'
import Card from '../components/Card'

class CheckUpScreen extends Component {
  static navigationOptions = {
    title: 'Aman Amanov',
    headerStyle: {
      backgroundColor: MAIN_COLOR,
    },
    headerTitleStyle: {
      color: GREY_COLOR,
    },
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
            icon={<Icon name="comment-dots" size={30} color={GREY_COLOR} />}
          />
        </View>
      </View>
    )
  }
}

export default CheckUpScreen
