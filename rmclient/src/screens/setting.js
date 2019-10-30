/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Container,Text,Header,Left ,Right, Content, Item, Input, Button,Label,ListItem} from 'native-base'
import {StyleSheet,Image,TouchableOpacity,View,TextInput,TouchableHighlight,Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import {ip} from '../services/ip'


export default class setting extends Component{
  constructor(props){
    super(props)
    this.state={
      token : '',
      tokening : '',
      userID : 0
    }
   
  }

  render() {
    return (
      <Container>
      <Content>
        <Item style={styles.photoiconcontainer}>
          <Left>
            <Image style={styles.image}  source={{uri : 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'}}></Image>
            </Left>
        </Item>
        <View style={styles.createWT}>
          <TouchableOpacity style={{width:Dimensions.get('window').width}} onPress={()=>this.props.navigation.navigate("web_creation")}>
              <Item style={{borderColor: 'white'}}>
              <Right>
              <Icon name="angle-right" size={30} style={styles.createcomicicon}/>
              </Right>
              </Item>
          </TouchableOpacity>  
        </View>
        <Item style={styles.createWT}>
          <TouchableOpacity style={{width:Dimensions.get('window').width}} onPress={() => this.logout()}> 
          <Text style={styles.menuText}>Log Out</Text>
          </TouchableOpacity> 
        </Item>
      </Content>
      
    </Container>
    );
  }
};

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
    photoiconcontainer:{
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: '#673ab7',
      borderBottomWidth: 2,
      borderColor:'black'
    },
    image:{
      width: 100, 
      height: 100, 
      borderRadius: 100/ 2,
      backgroundColor:'white'
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