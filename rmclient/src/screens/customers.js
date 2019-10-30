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
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux'
import Modal from 'react-native-modal'
import * as actionCustomers from '../_actions/customers'

class customer extends Component{
  constructor(props){
    super(props)
    this.state={
      token : '',
      tokening : '',
      userID : 0,
      update : false,
      tempid : 0,
      data : {
        name : '',
        identity_number : '',
        phone_number : '',
        image : ''
      },
      modal : false,   
      imagename : ''
    }
  }

  handleChoosePhoto = () =>{
    const options = {
        noData : true
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        console.log('this is it',response.uri)
        this.setState({imagename : response.fileName })
        this.setState(prevState => ({
          data : {
            ...prevState.data,image: response.uri
          }
        })
        )
      }
    })
};


  componentDidMount(){
    // await this.retrieveSessionToken()
     this.getThings()
   }
  
   getThings(){
     this.props.getCustomers()
   }

   edit(id,name){
    this.setState({modal: true,update: true,tempid : id , tempname: name})
  }

   store(){
    {(!this.state.update)?
    this.props.postCustomers(this.state.data):
    this.props.editCustomers(this.state.tempid,this.state.data)}
    console.log('DATA', this.state.data)
    this.setState({modal: false})
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
        <TouchableOpacity onLongPress={()=> this.edit(image.id,image.name) }>
        <Image style={styles.image}  source={{uri : image.image}}></Image>
        </TouchableOpacity>
        </Left>  
        <Body>
        <Text>{image.name}</Text>
        <Label>{image.identity_number}</Label>
        </Body>
        </Item> 
      </ListItem>
    );
  }

  render() {
    const {customers} = this.props
    return (
     <Container>
       <View>
      <FlatList
         style={styles.allContainer}
          data={customers.customers} 
          renderItem={({ item }) => this.allPage(item)}
          keyExtractor={item => item.id}>
      </FlatList> 
      </View>
      <View style={{alignSelf: 'center'}}>
      <Button style={{width : 100}} onPress ={()=> this.setState({modal : true})}>
        <Text>TAMBAH</Text>
      </Button>
      </View>
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
                data : {
                  ...prevState.data,name : name
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
                data : {
                  ...prevState.data,identity_number: data
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
                data : {
                  ...prevState.data,phone_number : phone_number
                }
              }))}
              />
        </View>
        <View style={{justifyContent:'center'}}>
        <TouchableOpacity onPress={this.handleChoosePhoto}>
              <Icon name="camera" size={20}></Icon>
        </TouchableOpacity>
        <Label>{this.state.imagename}</Label>
              </View>
              </View>
              <Button onPress={()=>this.store()} style={styles.button}>
                 <Text style={{color: 'black'}}>ADD ROOM</Text>
             </Button>
             <TouchableOpacity onPress={()=>this.setState({modal: false})}>
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
   customers : state.customers
  }
}

const mapDispatchToProps = dispatch => {
  return{
    getCustomers:() => dispatch(actionCustomers.handleGetCustomers()),
    postCustomers:(data) => dispatch(actionCustomers.handlePostCustomers(data)),
    editCustomers:(id,data) => dispatch(actionCustomers.handleEditCustomers(id,data))
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
        height:50,
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
    },
    image:{
      marginLeft : 15,
      marginTop : 10,
      width: 50, 
      height: 50, 
      borderRadius: 50/ 2,
      borderWidth:4,
      borderColor:'black'
    },
  });