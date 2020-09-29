import React, { Component } from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar, StyleSheet } from 'react-native';
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import decks from './src/reducers/decks'
import logger from './src/middleware/logger'
import Stacks from './src/nav/Stacks'
import { setLocalNotif, clearLocalNotif } from './src/shared/utils/Notif'

const store = createStore(decks, applyMiddleware(thunk, logger))
console.log('App started')

export default class App extends Component {

  componentDidMount() {
    clearLocalNotif().then(setLocalNotif)
  }

  render() {
    return (
      <NavigationContainer>
        <Provider store={ store }>
          <StatusBar />
          <Stacks />
        </Provider>
      </NavigationContainer>
    )
  }
}