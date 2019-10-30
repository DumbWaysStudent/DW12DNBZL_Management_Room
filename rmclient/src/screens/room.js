/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Container,Text,Header, Body, Content, Left, Input, Button,Label,ListItem,Title,Fab} from 'native-base'
import {StyleSheet,Image,TouchableOpacity,View,TextInput,TouchableHighlight,Dimensions,FlatList} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import {ip} from '../services/ip'
import {connect} from 'react-redux'
import Modal from 'react-native-modal'
import * as actionRooms from '../_actions/rooms'

class room extends Component{
  constructor(props){
    super(props)
    this.state={
      modal : false,
      string : '',
      allow : true,
      pass: '',
      update : false,
      button_status : true,
      token : '',
      tokening : '',
      userID : 0,
      tempid : 0,
      tempname : '',
      fab : false,
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
      <ListItem >
        {(image.plusimage)?  <Button success style={styles.roombutton} onPress ={()=> this.setState({modal : true})}>
        <Icon name='plus' size={50} style={{color : '#673ab7'}}></Icon>
        </Button>:
        <Button success style={styles.roombutton} onPress={()=> this.edit(image.id,image.name)}>
        <Text style={styles.roomText}>{image.name}</Text>
        </Button>}
      </ListItem>
    );
  }

edit(id,name){
  this.setState({modal: true,update: true,tempid : id , tempname: name})

}

  store(){
    {(!this.state.update)?
    this.props.postRooms(this.state.newtitle):
    this.props.editRooms(this.state.tempid,this.state.newtitle)}
    this.setState({modal: false})

  }
  render() {
    const {rooms} = this.props
    return (
     <Container>
        <Header style={styles.container}>
          
            <Title style={styles.headerText}>Room List</Title>
         
        </Header>
       <View>
      <FlatList
         style={styles.allContainer}
          data={rooms.rooms.concat({plusimage:true})} 
          renderItem={({ item }) => this.allPage(item)}
          keyExtractor={item => item.id}
          numColumns= {4}>
      </FlatList> 
      <View style={{alignSelf: 'center'}}>
      </View>
      <Modal isVisible={this.state.modal}
      animationType="slide"
      transparent={true}>
          <View style={styles.containerform}>
              <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Room Name"
              placeholderTextColor='#673ab7'
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({newtitle : email})}
              />
        </View>
              <Button onPress={()=>this.store()} style={styles.button}>
                 <Text style={{color: 'black'}}>ADD ROOM</Text>
             </Button>
             <TouchableOpacity onPress={()=>this.setState({modal: false})}>
               <Text>Close</Text>
             </TouchableOpacity>
          </View>
        </Modal>
      </View>
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
    postRooms:(name) => dispatch(actionRooms.handlePostRooms(name)),
    editRooms:(id,name) => dispatch(actionRooms.handleEditRooms(id,name))
  }
 // getAllToon
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(room)


const styles = StyleSheet.create({
    container: {
      backgroundColor: '#673ab7',
    width: Dimensions.get('window').width,
    borderWidth: 1,
    borderColor: 'black'
    },
    containerform : {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#673ab7',
      height  : 200
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
    headerText : {
      marginTop : 5,
      fontSize: 30
    }, 
    inputs:{
        height:45,
        marginLeft:20,
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
    button: {
      backgroundColor: '#673ab7',
    },
    registerText: {
      color: 'black',
    },
    roomText: {
      color: '#673ab7',
      fontSize : 20
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
    },
    roombutton:{
      height : 70,
      position : 'relative',
      width : 70,
      marginRight : -22,
      marginBottom : -15,
      borderRadius : 10,
      borderColor : '#673ab7',
      borderWidth : 2,
      backgroundColor: '#7CFC00',
      justifyContent : 'center',
    }
  });