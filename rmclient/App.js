/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';

import { createAppContainer, createSwitchNavigator, NavigationActions } from 'react-navigation'
import { StyleSheet, TouchableOpacity, View, TextInput, TouchableHighlight, Dimensions, FlatList } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'
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
        screen: checkin,
        navigationOptions : {
          tabBarLabel : 'Checkin',
          tabBarIcon : ({tintColor}) =><Icon name='calendar' size={30} color = {tintColor}></Icon>,
          tabBarOptions : {
            activeTintColor : 'white',
            inactiveBackgroundColor : '#673ab7',
            activeBackgroundColor : '#673ab7',
            style : {
            borderRadius : 50,
             
            }
          }
        }
      },
      room: {
        screen: room,
        navigationOptions : {
          tabBarLabel : 'Rooms',
          tabBarIcon : ({tintColor}) =><Icon name='th' size={30} color = {tintColor}></Icon>,
          tabBarOptions : {
            activeTintColor : 'white',
            inactiveBackgroundColor : '#673ab7',
            activeBackgroundColor : '#673ab7'
          }
        }
      },
      customer: {
        screen: customer,
        navigationOptions : {
          tabBarLabel : 'Customers',
          tabBarIcon : ({tintColor}) =><Icon name='user' size={30} color = {tintColor}></Icon>,
          tabBarOptions : {
            activeTintColor : 'white',
            inactiveBackgroundColor : '#673ab7',
            activeBackgroundColor : '#673ab7'
          }
        }
      },
      setting: {
        screen: setting,
        navigationOptions : {
          tabBarLabel : 'Setting',
          tabBarIcon : ({tintColor}) =><Icon name='cog' size={30} color = {tintColor}></Icon>,
          tabBarOptions : {
            activeTintColor : 'white',
            inactiveBackgroundColor : '#673ab7',
            activeBackgroundColor : '#673ab7'
          }
        }
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



