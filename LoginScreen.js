import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Image, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import firebase from 'firebase';

export default class LoginScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            emailId : '',
            password : ''
        }
    }

    signIn = async(emailId,password) => {
        if(emailId && password){
            try{
                const response = await firebase.auth().signInWithEmailAndPassword(emailId,password);
                if(response){
                    this.props.navigation.navigate("Tabs")
                }
            }catch(error){
                switch(error.code){
                    case "auth/invalid-email" : alert("Email id is invalid");
                    break;
                    case "auth/user-not-found" : alert("User not found");
                    break;
                    case "auth/wrong-password" : alert("Write the correct password");
                    break;
                }
            }
        }
    }

    render(){
        return(
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <TextInput
                style = {styles.inputBox}
                placeholder = 'Enter Email ID Ex:abc@example.com'
                value = {this.state.emailId}
                keyboardType = 'email-address'
                onChangeText = {(text) => {
                    this.setState({emailId:text})
                }} />
                <TextInput
                style = {styles.inputBox}
                placeholder = 'Enter Password'
                secureTextEntry = {true}
                value = {this.state.password}
                onChangeText = {(text) => {
                    this.setState({password:text})
                }} />
                <TouchableOpacity style = {styles.submitButton}
                onPress = {() => {
                    this.signIn(this.state.emailId,this.state.password)
                }}>
                    <Text style = {styles.submitButtonText}>Login</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    inputBox:{
      width: 330,
      height: 40,
      borderWidth: 1.5,
      fontSize: 20,
      margin:20
    },
    submitButton:{
        backgroundColor: '#000000',
        width: 100,
        height:50
      },
    submitButtonText:{
        padding: 10,
        textAlign: 'center',
        fontSize: 20,
        fontWeight:"bold",
        color: 'white'
      }
});
