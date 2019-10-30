/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';

import { createAppContainer, createSwitchNavigator, NavigationActions } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import loginScreen from './src/screens/loginScreen'
import checkin from './src/screens/checkin'
import room from './src/screens/room'
import customer from './src/screens/customers'
import setting from './src/screens/setting'
import { Provider } from 'react-redux'
import { store } from './src/_redux/store'

const switchContainer = createSwitchNavigator({
  login: loginScreen,
  checkin: {
    screen: createBottomTabNavigator({
      checkin: {
        screen: checkin
      },
      room: {
        screen: room
      },
      customer: {
        screen: customer
      },
      setting: {
        screen: setting
      }
    })
  }
}, {
  initialRouteName: 'checkin'
}
)

const AppContainer = createAppContainer(switchContainer)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
};



