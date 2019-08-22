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
import {View, ActivityIndicator, Alert, FlatList} from 'react-native'
import {Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {connect} from 'react-redux'
// import Accordion from 'react-native-collapsible/Accordion';

import {MAIN_COLOR, GREY_COLOR} from '../config/Constants'
import Card from '../components/Card'
// import PushNotificationService from '../config/PushNotificationConfig'
import {getUsersSchedule, markAsDone} from '../actions/userActions'

class CheckUp extends Component {
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
      loading: false,
    }

    this.pushService
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

  getNotCompleted = () =>
    this.props.current_user.schedules.filter(
      item => item.is_done !== true && item.type !== 'treatment'
    )

  renderItem = item => (
    <Card markDone={() => this.markTaskAsDone(item.id, item.title)} schedule={item} />
  )

  render() {
    return this.props.current_user.loading ? (
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
  getUsersSchedule: token => dispatch(getUsersSchedule(token)),
  markAsDone: (id, token) => dispatch(markAsDone(id, token)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckUp)
