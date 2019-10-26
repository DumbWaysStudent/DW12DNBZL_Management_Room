/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Container,Text,Header, Body, Content, Item, Input, Button,Label,ListItem, Left, Right} from 'native-base'
import {StyleSheet,Image,TouchableOpacity,View,TextInput,TouchableHighlight,Dimensions,FlatList} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import {ip} from '../services/ip'
import {connect} from 'react-redux'
import * as actionCustomers from '../_actions/customers'

class customer extends Component{
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
     this.props.getCustomers()
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
      <ListItem style={styles.listItemContainer}>
        <Item>
        <Left>
        <Text>{image.name}</Text>
        </Left>
        <Right>
        <Label>{image.identity_number}</Label>
        </Right>
        </Item>
      </ListItem>
     
    );
  }

  render() {
    console.log('IINI CUSTOMERSNYAAAA',this.props.customers.customers)
    return (
     <Container>
      <FlatList
         style={styles.allContainer}
          data={this.props.customers.customers.data} 
          renderItem={({ item }) => this.allPage(item)}
          keyExtractor={item => item.id}>
      </FlatList> 
    </Container>
    );
  }
};


const mapStateToProps = state => {
  return {
   // toons: state.toons
   customers : state.customers
  }
}

const mapDispatchToProps = dispatch => {
  return{
    getCustomers:() => dispatch(actionCustomers.handleGetCustomers()),
  }
 // getAllToon
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(customer)


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