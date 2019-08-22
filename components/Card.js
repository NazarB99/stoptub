/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, {Component} from 'react'
import {Text, View, StyleSheet, Animated} from 'react-native'
import {Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import moment from 'moment'

import {MAIN_COLOR, GREY_COLOR} from '../config/Constants'

import BlinkDot from './BlinkDot'

const styles = StyleSheet.create({
  card: {
    height: 130,
    // flexDirection: 'row',
    borderColor: '#000',
    borderWidth: 0.2,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  wrapper: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

const getParsedTime = time => moment(time).format('DD MMMM YYYY HH:mm')

class Card extends Component {
  state = {
    expand: false,
  }

  componentDidMount() {
    // this.interval = setInterval(() => {
    //   this.onPress()
    // }, 1800)
    // this.onPress()
    // console.log(this.isLate(this.props.schedule.time))
  }

  toggleDescription = () => {
    this.setState({expand: !this.state.expand})
  }

  isLate = date => {
    console.log('now date')
    console.log(Date.now().toString())
    const isbefore = moment(date).isBefore(moment(Date.now()))
    return isbefore
  }

  // {
  //   backgroundColor: this.state.backgroundColor.interpolate({
  //     inputRange: [0, 100],
  //     outputRange: ['#dd6b7f', '#fff'],
  //   }),
  // },

  render() {
    console.log('UPDATED!!!!!')
    return (
      <View
        style={
          this.state.expand
            ? [styles.card, {height: 200}]
            : [styles.card, {justifyContent: 'center', alignItems: 'center'}]
        }
      >
        <View style={styles.wrapper}>
          <View
            style={[
              {flex: 2, paddingLeft: 10},
              this.state.expand
                ? {marginTop: 20, height: 50}
                : {justifyContent: 'center', marginTop: 15},
            ]}
          >
            <Text style={{fontFamily: 'Roboto-Bold', fontSize: 20}}>
              {this.props.schedule.title}
            </Text>
            <Text style={{fontFamily: 'Roboto-Regular'}}>
              {getParsedTime(this.props.schedule.time)}
            </Text>
          </View>
          <View
            style={[
              {flex: 1, flexDirection: 'row', alignItems: 'center'},
              this.state.expand
                ? {
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    marginTop: 20,
                    height: 50,
                  }
                : {justifyContent: 'center', alignItems: 'center'},
            ]}
          >
            <Button
              onPress={() => this.props.markDone()}
              buttonStyle={{backgroundColor: 'rgba(0,0,0,0)'}}
              icon={<Icon name="check-circle" size={25} color={MAIN_COLOR} />}
            />
            <Button
              buttonStyle={{backgroundColor: 'rgba(0,0,0,0)'}}
              onPress={() => this.toggleDescription()}
              icon={
                <Icon
                  name={this.state.expand ? 'chevron-up' : 'chevron-down'}
                  size={25}
                  color={MAIN_COLOR}
                />
              }
            />
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomLeftRadius: 25,
            borderColor: MAIN_COLOR,
            borderWidth: 0.4,
            backgroundColor: MAIN_COLOR,
          }}
        >
          <Icon
            size={16}
            name={this.props.schedule.type === 'treatment' ? 'pills' : 'user-md'}
            color={GREY_COLOR}
            style={{marginLeft: 8, marginBottom: 8, marginTop: 6, marginRight: 4}}
          />
        </View>
        {this.isLate(this.props.schedule.time) && <BlinkDot />}
        {this.state.expand && (
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 5,
              borderTopColor: 'rgba(209, 207, 207,0.7)',
              borderTopWidth: 1,
            }}
          >
            <Text style={{flex: 1, flexWrap: 'wrap'}}>
              {this.props.schedule.description}
              {this.props.schedule.description}
            </Text>
          </View>
        )}
      </View>
    )
  }
}

export default Card
