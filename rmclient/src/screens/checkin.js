/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Container, Header, Picker, Text, Body, Content, Title, Left, Right, Button, Label, ListItem } from 'native-base'
import { StyleSheet, TouchableOpacity, View, TextInput, TouchableHighlight, Dimensions, FlatList, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import AsyncStorage from '@react-native-community/async-storage'
import * as actionRooms from '../_actions/rooms'
import * as actionCustomers from '../_actions/customers'
import CountDown from 'react-native-countdown-component';
import moment from "moment";
import SafeAreaView from 'react-native-safe-area-view';


class checkin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      BannerWidth: Dimensions.get('window').width,
      BannerHeight: 200,
      roomid: 0,
      modal: false,
      selected: undefined,
      roomname: '',
      endtime: undefined,
      interval: undefined,
      checkout: false,
      orderid: undefined,
    }
  }

  async componentDidMount() {
    // await this.retrieveSessionToken()
    this.getThings()
    console.log('time', this.state.now, this.state.endtime)
  }

  getThings() {
    this.props.getOrders()
    this.props.getCustomers()
  }

  checkout(id) {
    this.setState({ orderid: id, checkout: true, modal: true })
  }

  onValueChange(value) {
    this.setState({
      selected: value
    })
  }

  renderButton(image) {
    if (this.props.rooms.isLoading) {
      return (
        <TouchableHighlight onPress={() => this.checkin(image.id, image.name)} style={styles.roombutton}>
          <ActivityIndicator size="small" color="#0000ff" ></ActivityIndicator>
        </TouchableHighlight>)
    } else {
      return (
        <TouchableHighlight onPress={() => this.checkin(image.id, image.name)} style={styles.roombutton}>
          <Text style={styles.tittleall}>{image.name}</Text>
        </TouchableHighlight>)
    }
  }
  renderRedButton(image) {
    if (this.props.rooms.isRedLoading) {
      return (
        <Button onPress={() => this.checkout(image.orderid.id)} style={styles.noroombutton}>
          <ActivityIndicator size="small" color="#0000ff" ></ActivityIndicator>
        </Button>)
    } else {
      return (
        <Button onPress={() => this.checkout(image.orderid.id)} style={styles.noroombutton}>
          <Text style={styles.tittleall}>{image.name}</Text>
          <CountDown
            until={moment(image.orderid.order_end_time).diff(moment().format()) / 1000}
            //until={moment(moment().format()).diff(image.orderid.order_end_time)}
            onFinish={() => this.timeout(image.orderid.id)}
            onPress={() => alert('hello')}
            size={9}
          />
        </Button>)
    }
  }

  timeout(id) {
    this.props.editOrders(id)
  }

  checkin(id, name) {
    this.setState({ modal: true, roomname: name, roomid: id })
  }

  store() {
    if (this.state.checkout !== true) {
      const end_time = moment(moment().format()).add(this.state.interval, 'seconds')
      this.props.postOrders(this.state.roomid, this.state.interval, this.state.selected, end_time)
      this.setState({ modal: false })
    } else {
      this.props.editOrders(this.state.orderid)
      this.setState({ checkout: false, modal: false })
    }
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
        {(image.order_id !== null) ?
          (image.orderid.is_booked !== true) ?
            this.renderButton(image) :
            this.renderRedButton(image)
          : this.renderButton(image)}
      </ListItem>
    );
  }
  render() {
    const { rooms, customers } = this.props
    return (
      <Container>
        <Header style={styles.container}>
            <Title style={styles.headerText}>Order Status</Title>
        </Header>
        <SafeAreaView>
          <FlatList
            contentContainerStyle={styles.allContainer}
            data={rooms.rooms}
            renderItem={({ item }) => this.allPage(item)}
            keyExtractor={item => item.id}
            numColumns={3}>
          </FlatList>
        </SafeAreaView>
        <Modal isVisible={this.state.modal} animationType="slide" transparent={true}>
          <View style={styles.containerform}>
            <View>
              <View style={styles.labelContainer}>
                <Label style={styles.labelText}>{this.state.roomname}</Label>
              </View>
              <View style={styles.inputContainer}>
                <Picker
                  enabled={(this.state.checkout) ? false : true}
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  placeholder="Select Customers"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  style={{ width: 200 }}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  {customers.customers.map((key, i) => {
                    return (<Picker.Item label={key.name} value={key.id} key={i}></Picker.Item>)
                  })}
                </Picker>
              </View>
              <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                  enabled={(this.state.checkout) ? true : false}
                  placeholder="Interval"
                  placeholderTextColor='#673ab7'
                  underlineColorAndroid='transparent'
                  onChangeText={(email) => this.setState({ interval: email })}
                />
              </View>
            </View>
            <Button onPress={() => this.store()} style={styles.button}>
              <Text style={{ color: 'black' }}>{(this.state.checkout) ? 'CHECKOUT' : 'CHECKIN'}</Text>
            </Button>
            <TouchableOpacity onPress={() => this.setState({ modal: false })}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </Container>
    )
  }
};

const mapStateToProps = state => {
  return {
    // toons: state.toons
    rooms: state.rooms,
    customers: state.customers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(actionRooms.handleGetOrders()),
    postOrders: (id, interval, customer, endtime) => dispatch(actionRooms.handlePostOrders(id, interval, customer, endtime)),
    editOrders: (id) => dispatch(actionRooms.handleEditOrders(id)),
    getCustomers: () => dispatch(actionCustomers.handleGetCustomers())
  }
  // getAllToon
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(checkin)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#673ab7',
    width: Dimensions.get('window').width,
    borderWidth: 1,
    borderColor: 'black'
  },
  containerform: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#673ab7',
    height: 400
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
  labelContainer: {
    width: 250,
    height: 35,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelText: {
    fontSize: 50,
  },
  headerText : {
    marginTop : 5,
    fontSize: 30
  }, 
  inputs: {
    height: 45,
    marginLeft: 20,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  allContainer: {
    marginTop: 20,
    marginLeft: -10,
    justifyContent: 'center'
  },
  listItemContainer: {
    borderColor: 'white',
    marginHorizontal: -30,
    marginVertical: -12
  },
  tittleall: {
    fontSize: 25,
    marginBottom: 10,
    color : '#673ab7',
    
  },
  roombutton: {
    height: 110,
    width: 110,
    borderRadius: 10,
    borderColor : '#673ab7',
    borderWidth : 2,
    backgroundColor:'#7CFC00',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  noroombutton: {
    borderColor : '#673ab7',
    borderWidth : 2,
    height: 110,
    width: 110,
    borderRadius: 10,
    backgroundColor: '#8FBC8F',
    justifyContent: 'center',
    flexDirection: 'column'
  }
})