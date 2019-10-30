/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Container, Text, Header, Body, Content, Item, Input, Button, Label, ListItem, Left, Right, Title } from 'native-base'
import { StyleSheet, Image, TouchableOpacity, View, TextInput, TouchableHighlight, Dimensions, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import * as actionCustomers from '../_actions/customers'

class customer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      tokening: '',
      userID: 0,
      update: false,
      tempid: 0,
      photo: '',
      data: {
        name: '',
        identity_number: '',
        phone_number: '',
        image: ''
      },
      modal: false,
      imagename: ''
    }
  }

  handleChoosePhoto = () => {
    const options = {
      noData: true
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        console.log('this is it', response.uri)
        this.setState({ imagename: response.fileName, photo: response })
        this.setState(prevState => ({
          data: {
            ...prevState.data, image: response.uri
          }
        })
        )
      }
    })
  };


  componentDidMount() {
    // await this.retrieveSessionToken()
    this.getThings()
  }

  getThings() {
    this.props.getCustomers()
  }

  edit(id, name) {
    this.setState({ modal: true, update: true, tempid: id, tempname: name })
  }

  store() {
    {
      (!this.state.update) ?
      this.props.postCustomers(this.state.photo, this.state.data) :
      this.props.editCustomers(this.state.tempid, this.state.photo, this.state.data)
    }
    this.setState({ modal: false, photo: '' })
  }
  async retrieveSessionToken() {
    try {
      const tokening = await AsyncStorage.getItem('userToken');
      if (tokening !== null) {
        console.log("Session token", tokening);
        this.setState({ token: tokening })
      } else {
        console.log("Youre not Logged in Yet");
        alert('must login first')
        this.props.navigation.navigate('Login')
      }
    } catch (e) {
      console.log(error)
    }
  }

  allPage(image) {
    return (
      <ListItem style={styles.listItemContainer}>
        <Item style={{ borderColor: '#673ab7' }}>
          <TouchableOpacity onLongPress={() => this.edit(image.id, image.name)}>
            <Image style={styles.image} source={{ uri: image.image }}></Image>
          </TouchableOpacity>
          <Left>
            <Text style={styles.loginText}>{image.name}</Text>
            <Label style={styles.idText}>{image.identity_number}</Label>
          </Left>

        </Item>
      </ListItem>
    );
  }

  render() {
    const { customers } = this.props
    return (
      <Container>
        <Header style={styles.container}>
          <Title style={styles.headerText}>Customers List</Title>
        </Header>
        <FlatList
          style={styles.allContainer}
          data={customers.customers}
          renderItem={({ item }) => this.allPage(item)}
          keyExtractor={item => item.id}>
        </FlatList>
        <View style={{ alignSelf: 'center' }}>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => this.setState({ modal: true })}
          style={styles.TouchableOpacityStyle}>
          <Icon name='user-plus' size={50}
            style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>
        <Modal isVisible={this.state.modal}
          animationType="slide"
          transparent={true}>
          <View style={styles.containerform}>
            <View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Name"
                  placeholderTextColor='#673ab7'
                  underlineColorAndroid='transparent'
                  onChangeText={(name) => this.setState(prevState => ({
                    data: {
                      ...prevState.data, name: name
                    }
                  }))}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="identity_number"
                  placeholderTextColor='#673ab7'
                  underlineColorAndroid='transparent'
                  onChangeText={(data) => this.setState(prevState => ({
                    data: {
                      ...prevState.data, identity_number: data
                    }
                  }))}
                />
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Phone Number"
                  placeholderTextColor='#673ab7'
                  underlineColorAndroid='transparent'
                  onChangeText={(phone_number) => this.setState(prevState => ({
                    data: {
                      ...prevState.data, phone_number: phone_number
                    }
                  }))}
                />
              </View>
              <View style={{ justifyContent: 'center' }}>
                <TouchableOpacity onPress={this.handleChoosePhoto}>
                  <Icon name="camera" size={20}></Icon>
                </TouchableOpacity>
                <Label>{this.state.imagename}</Label>
              </View>
            </View>
            <Button onPress={() => this.store()} style={styles.button}>
              <Text style={{ color: 'black' }}>{(this.state.update) ? 'UPDATE CUSTOMER' : 'ADD CUSTOMER'}</Text>
            </Button>
            <TouchableOpacity onPress={() => this.setState({ modal: false })}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Container>
    );
  }
};


const mapStateToProps = state => {
  return {
    // toons: state.toons
    customers: state.customers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCustomers: () => dispatch(actionCustomers.handleGetCustomers()),
    postCustomers: (photo, data) => dispatch(actionCustomers.handlePostCustomers(photo, data)),
    editCustomers: (id, photo, data) => dispatch(actionCustomers.handleEditCustomers(id, photo, data))
  }
  // getAllToon
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(customer)


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#673ab7',
    width: Dimensions.get('window').width,
    borderWidth: 1,
    borderColor: 'black'
  },
  allContainer: {
    marginLeft: -10,
    marginTop: 20,
    marginRight: 10,
  },
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 0,
  },
  headerText: {
    marginTop: 5,
    fontSize: 30
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 70,
    height: 50,
    marginBottom: 50,
    color: '#673ab7'
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
    height: 50,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  listItemContainer: {
    borderColor: 'black',
    backgroundColor: '#673ab7',
    borderWidth: 3,
    marginBottom: 10
  },
  loginText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10
  },
  idText: {
    color: 'white'
  },
  image: {
    marginLeft: 15,
    marginRight: 20,
    width: 80,
    height: 80,
    borderRadius: 50 / 2,
    borderWidth: 4,
    borderColor: 'black'
  },
});