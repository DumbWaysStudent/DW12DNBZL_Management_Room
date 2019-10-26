/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Container,Text,Header, Body, Content, Item, Input, Button,Label,ListItem} from 'native-base'
import {StyleSheet,Image,TouchableOpacity,View,TextInput,TouchableHighlight,Dimensions,FlatList} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import {ip} from '../services/ip'
import {connect} from 'react-redux'
import * as actionRooms from '../_actions/rooms'

class room extends Component{
  constructor(props){
    super(props)
    this.state={
      eye : true,
      string : '',
      allow : true,
      pass: '',
      button_status : true,
      token : '',
      tokening : '',
      userID : 0
    }
  }
  async componentDidMount(){
    // await this.retrieveSessionToken()
     this.getThings()
    
   }
  
   getThings(){
     this.props.getRooms()
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
        <Button success style={{backgroudColor : 'red'}}>
        <Text>{image.name}</Text>
        </Button>
      </ListItem>
     
    );
  }

  render() {
    console.log('IINI ROOMNYAAAA',this.props.rooms.rooms.data)
    return (
     <Container>
      <FlatList
         style={styles.allContainer}
          data={this.props.rooms.rooms.data} 
          renderItem={({ item }) => this.allPage(item)}
          keyExtractor={item => item.id}
          numColumns= {4}>
      </FlatList> 
    </Container>
    );
  }
};

const mapStateToProps = state => {
  return {
   // toons: state.toons
   rooms : state.rooms
  }
}

const mapDispatchToProps = dispatch => {
  return{
    getRooms:() => dispatch(actionRooms.handleGetRooms()),
  }
 // getAllToon
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(room)


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#673ab7',
    },
    containerlogo :{
      alignItems: 'center',
      marginTop : 40,
      backgroundColor: '#673ab7',
      marginBottom : 30,
      width : Dimensions.get('window').width
    },
    containerform : {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#673ab7',
    },
    inputContainer: {
        
        backgroundColor: '#FFFFFF',
        borderRadius:20,
        borderWidth : 2,
        width:250,
        height:35,
        marginBottom:10,
        flexDirection: 'row',
        alignItems:'center'
    },
    
    inputs:{
        height:45,
        marginLeft:0,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
      marginLeft:15,
      justifyContent: 'center'
    },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:10,
      marginTop: 20 ,
      width:150,
      borderRadius:30,
    },
    loginButton: {
      backgroundColor: 'black',
      borderColor : '#673ab7',
      borderWidth : 2
    },
    registerButton: {
      backgroundColor: '#673ab7',
      borderColor : '#673ab7',
      borderWidth : 2
    },
    foryouButton: {
      backgroundColor: '#673ab7',
      borderColor : '#673ab7',
      borderWidth : 2,
      marginTop : 30
    },
    registerText: {
      color: 'black',
    },
    loginText: {
      color: '#673ab7',
    },
    foryouText:{
      color : 'white'
    },
    apptext : {
      fontSize : 30,
      color: 'black'
    },
    Icon :{
      marginRight : 10
    }
  });