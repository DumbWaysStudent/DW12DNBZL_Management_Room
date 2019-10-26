/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Container,Header,Text, Body, Content, Item, Input, Button,Label,ListItem} from 'native-base'
import {Image,View,StyleSheet,Dimensions,ScrollView,FlatList,SafeAreaView,TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import {ip} from '../services/ip'
import {connect} from 'react-redux'

import AsyncStorage from '@react-native-community/async-storage'
import * as actionOrders from '../_actions/orders'


class checkin extends Component{
  constructor(props){
    super(props)
    this.state={
      BannerWidth: Dimensions.get('window').width,
      BannerHeight: 200,
      entries: [],
      search : '',
      toons : [],
      favorites : [],
      favarray : [],
      id_user : 0
    }
  }
  
  async componentDidMount(){
   // await this.retrieveSessionToken()
    this.getThings()
   
  }
 
  getThings(){
    this.props.getOrders()
  }

  async retrieveSessionToken() {
    try {
      const tokening = await AsyncStorage.getItem('userToken');
      if (tokening !== null) {
        console.log("Session token",tokening);
        this.setState({token : tokening})
      }else{
        console.log("Youre not Logged in Yet");
        alert('must login first')
        this.props.navigation.navigate('Login')
      }
     }catch (e) {
       console.log(error)
     }
  }

  allPage(image) {
    return (
      <ListItem>
        {(image.is_booked)?
        <Button warning style={{backgroudColor : 'green'}}>
        <Text style={styles.tittleall}>{image.roomid.name}</Text>
        </Button> :
        <Button success style={{backgroudColor : 'red'}}>
        <Text style={styles.tittleall}>{image.roomid.name}</Text>
        </Button>}
        
      </ListItem>
     
    );
  }

  render() {
    console.log('IINI DATANYAAA',this.props.orders.orders.data)
    return (
      <Container>
        <FlatList
           style={styles.allContainer}
            data={this.props.orders.orders.data} 
            renderItem={({ item }) => this.allPage(item)}
            keyExtractor={item => item.id}
            numColumns= {3}>
        </FlatList> 
      </Container>
    )
  }
};

const mapStateToProps = state => {
  return {
   // toons: state.toons
   orders : state.orders
  }
}

const mapDispatchToProps = dispatch => {
  return{
    getOrders:() => dispatch(actionOrders.handleGetOrders()),
  }
 // getAllToon
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(checkin)

const styles = StyleSheet.create({
  container: {
    backgroundColor : '#673ab7',
    width : Dimensions.get('window').width,
    borderWidth: 1,
    borderColor : 'black'
  },
  header:{
    backgroundColor:'#673ab7',
  
  },
  seachIcon:{
    marginRight: 15
  },
  logo : {
    flex :1,
    width: "100%",
    height: 200,
    resizeMode: "contain",
    alignSelf: 'center'
  },
  favoriteContainer:{
    marginHorizontal : 2,
    backgroundColor: 'white',
    height:128,
    width:80,
    marginTop: 5,
  },
  favoriteImage:{
    width: 80, 
    height: 100,
    borderWidth:2,
    borderColor : 'black',
  },  
  favoriteText:{
    fontSize:10,
    textAlign :'center',
    color: 'black'
  },
  allContainer:{ 
    marginRight : 15,
  },
  listItemContainer:{
    width: Dimensions.get('window').width,
    marginTop: 5,
    backgroundColor: 'white'
  },
  subMenuTextContainer :{
    marginLeft:15,
    marginTop : 10,
    marginBottom: 5
  },
  text:{
    fontSize: 18,
    color:'black',
  },
  image : {
    flex: 1,
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  favoritebutton:{
    height:20,
    width:70,
    marginLeft : 12,
    backgroundColor: '#ee532f'
  },
  tittleall :{
    fontSize:15,
    marginBottom : 10
  },
  favoritebuttondisabled:{
    height:20,
    width:70,
    marginLeft : 12,
    backgroundColor: 'black'
  },
})