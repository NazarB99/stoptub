/* eslint-disable react/destructuring-assignment */
import React, {Component} from 'react'
import {View, Animated, Text} from 'react-native'
import moment from 'moment'

class BlinkDot extends Component {
  state = {
    backgroundColor: new Animated.Value(0),
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.onPress()
    }, 1800)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  onPress = () => {
    // onPress, initialize to default value using setState and start animation
    // after the state has been updated
    this.setState({backgroundColor: new Animated.Value(0)}, () => {
      Animated.loop(
        Animated.timing(this.state.backgroundColor, {
          toValue: 100,
          duration: 1800,
        }).start()
      )
    })
  }

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: 10,
          right: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Animated.View
          style={[
            {height: 10, width: 10, borderRadius: 20},
            {
              backgroundColor: this.state.backgroundColor.interpolate({
                inputRange: [0, 50, 100],
                outputRange: ['#dd6b7f', '#e6bbb3', '#fff'],
              }),
            },
          ]}
        />
        <Text> - Attention</Text>
      </View>
    )
  }
}

export default BlinkDot
