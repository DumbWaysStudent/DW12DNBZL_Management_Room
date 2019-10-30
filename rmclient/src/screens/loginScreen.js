/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, Toast, Root } from 'native-base'
import { StyleSheet, Image, TouchableOpacity, View, TextInput, TouchableHighlight, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import { ip } from '../services/ip'


export default class loginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      eye: true,
      string: '',
      allow: true,
      pass: '',
      button_status: true,
      token: '',
      tokening: '',
      userID: 0
    }

  }
  async setitem() {
    await AsyncStorage.setItem('userToken', this.state.token);
  }

  login = async () => {
    try {
      let tempUser = {
        email: this.state.string,
        password: this.state.pass
      }
      await axios.post(`${ip}/login`, tempUser)
        .then((response) => {
          if (typeof response.data.token !== 'undefined') {
            this.setState({ token: response.data.token })
            this.setitem()
            this.props.navigation.navigate('checkin')
          } else {
            alert('Gagal login')
          }
        })
        .catch((error) => {
          alert(error)
        });
    }
    catch (e) {
      console.log(e)
    }
  }

  validate = () => {
    if ((this.state.string !== '') && (this.state.pass !== '')) {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.string)) {
        this.state.allow = true;
        this.login()
        Toast.show({
          text: "Correct Email Format",
          buttonText: "Okay",
          duration: 3000,
        });
      } else {
        this.state.allow = false;
        Toast.show({
          text: "Wrong Email Format",
          buttonText: "Okay",
          duration: 3000,
        });
      }
    } else {
      Toast.show({
        text: "email or password cant be empty",
        buttonText: "Okay",
        duration: 3000,
      });
    }
  }



  render() {
    return (
      <Root>
        <View style={styles.container}>
          <View style={styles.containerlogo}>
            <Text style={styles.apptext}>DumbSpace</Text>
            <Text fontSize={10}></Text>
          </View>
          <View style={styles.containerform}>
            <View style={styles.inputContainer}>
              <Icon size={20} name='envelope' style={styles.inputIcon} > </Icon>
              <TextInput style={styles.inputs}
                placeholder="Email"
                placeholderTextColor='#673ab7'
                keyboardType="email-address"
                underlineColorAndroid='transparent'
                onChangeText={(email) => this.setState({ string: email })} />
            </View>
            <View style={styles.inputContainer}>
              <Icon size={20} name='key' style={styles.inputIcon} > </Icon>
              <TextInput style={styles.inputs}
                placeholder="Password"
                placeholderTextColor='#673ab7'
                secureTextEntry={this.state.eye}
                underlineColorAndroid='transparent'
                onChangeText={(password) => this.setState({ pass: password })} />
              <TouchableOpacity onPressIn={() => this.setState({ eye: false })} onPressOut={() => this.setState({ eye: true })}>
                <Icon name='eye' size={20} style={styles.Icon}></Icon>
              </TouchableOpacity>
            </View>

            <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.validate()}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableHighlight>
            {/* <TouchableHighlight style={[styles.registerButton]} onPress={()=>this.props.navigation.navigate("Register")}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.foryouButton]} onPress={()=>this.props.navigation.navigate("Fyscreen")}>
          <Text style={styles.foryouText}>I just came here to read the TOON</Text>
        </TouchableHighlight> */}
          </View>
        </View>
      </Root>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#673ab7',
  },
  containerlogo: {
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: '#673ab7',
    marginBottom: 30,
    width: Dimensions.get('window').width
  },
  containerform: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#673ab7',
  },
  inputContainer: {

    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 2,
    width: 250,
    height: 35,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },

  inputs: {
    height: 45,
    marginLeft: 0,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
    width: 150,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: 'black',
    borderColor: '#673ab7',
    borderWidth: 2
  },
  registerButton: {
    backgroundColor: '#673ab7',
    borderColor: '#673ab7',
    borderWidth: 2
  },
  foryouButton: {
    backgroundColor: '#673ab7',
    borderColor: '#673ab7',
    borderWidth: 2,
    marginTop: 30
  },
  registerText: {
    color: 'black',
  },
  loginText: {
    color: '#673ab7',
  },
  foryouText: {
    color: 'white'
  },
  apptext: {
    fontSize: 30,
    color: 'black'
  },
  Icon: {
    marginRight: 10
  }
});