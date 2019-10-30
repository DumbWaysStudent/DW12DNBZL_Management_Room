/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Container, Text, Header, Left, Right, Content, Item, Body, Button, Label, Title } from 'native-base'
import { StyleSheet, Image, TouchableOpacity, View, TextInput, TouchableHighlight, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'


export default class setting extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      tokening: '',
      userID: 0
    }
  }

  render() {
    return (
      <Container>
        <Header style={styles.container}>
          <Title style={styles.headerText}>Settings</Title>
        </Header>
        <Content>
          <View style={styles.photoiconcontainer}>
              <Image style={styles.image}  source={{uri : ''}}></Image>
              <Text>{'BEHAHAHAHAH'}</Text>
          </View>
          <Item style={styles.createWT}>
            <Button onPress={() => this.logout()}> 
            <Text style={styles.menuText}>Log Out</Text>
            </Button> 
          </Item>
        </Content>
      </Container>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#673ab7',
    width: Dimensions.get('window').width,
    borderWidth: 1,
    borderColor: 'black'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  photoiconcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#673ab7',
    borderBottomWidth: 2,
    borderColor: 'black'
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 250 / 2,
    backgroundColor: 'white'
  },
  createWT: {
    height: 50,
    borderColor: 'white'
  },
  menuText: {
    marginLeft: 20,
    marginTop: 20
  },
  headerText: {
    marginTop: 5,
    fontSize: 30
  },

});