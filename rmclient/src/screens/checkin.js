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


export default class checkin extends Component{
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
  
 
  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          <Text>INI CHECK IN</Text>
        </Content>
        
      </Container>
    )
  }
};


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