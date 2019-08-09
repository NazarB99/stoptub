/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import {persistStore, persistCombineReducers} from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import Reactotron from 'reactotron-react-native'

import rootReducer from './reducers'
import './config/ReactotronConfig'

const middleware = [thunk]

const persistConfig = {
  key: 'primary',
  storage: AsyncStorage,
  whitelist: ['users'],
  // stateReconciler:hardSet
}

export const store = createStore(
  persistCombineReducers(persistConfig, rootReducer),
  undefined,
  compose(applyMiddleware(...middleware))
)

export const persistor = persistStore(store)

// export default {store,persistor};
