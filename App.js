/* eslint-disable import/no-named-as-default */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-alert */
/* eslint-disable no-new */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable func-names */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import React, {Component} from 'react'
import {View, StyleSheet, AppState} from 'react-native'
import {createAppContainer, createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'
import Icon from 'react-native-vector-icons/FontAwesome5'

import LoginScreen from './screens/LoginScreen'
import MainScreen from './screens/MainScreen'
import MedicationScreen from './screens/MedicationScreen'
import CheckUpScreen from './screens/CheckUpScreen'
import DialogsScreen from './screens/DialogsScreen'
import ChatScreen from './screens/ChatScreen'
import VideoScreen from './screens/VideoScreen'
import {store, persistor} from './store'
import {MAIN_COLOR, GREY_COLOR} from './config/Constants'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

const StackNav = createStackNavigator(
  {
    Login: LoginScreen,
    Main: MainScreen,
    Dialog: DialogsScreen,
    Chat: ChatScreen,
    Video: VideoScreen,
  },
  {
    initialRouteName: 'Login',
  }
)

const MedStack = createStackNavigator(
  {
    Medication: MedicationScreen,
  },
  {
    initialRouteName: 'Medication',
  }
)

const CheckUpStack = createStackNavigator(
  {
    CheckUp: CheckUpScreen,
  },
  {
    initialRouteName: 'CheckUp',
  }
)

const TabNav = createBottomTabNavigator(
  {
    FStackNav: {
      screen: StackNav,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Icon name="home" size={20} color={tintColor} />,
      },
    },
    Medication: {
      screen: MedStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Icon name="pills" size={20} color={tintColor} />,
      },
    },
    CheckUp: {
      screen: CheckUpStack,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => <Icon name="user-md" size={20} color={tintColor} />,
      },
    },
  },
  {
    initialRouteName: 'FStackNav',
    tabBarOptions: {
      activeTintColor: MAIN_COLOR,
      inactiveTintColor: GREY_COLOR,
    },
  }
)

const AppNavigatior = createAppContainer(TabNav)

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <View style={styles.container}>
        <AppNavigatior style={{flex: 1}} />
      </View>
    </PersistGate>
  </Provider>
)

export default App
