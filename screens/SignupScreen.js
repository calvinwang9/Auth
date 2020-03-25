import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import fire from '../Firebase';
import styles from '../styles/Styles';

export default class Signup extends React.Component {
  state = {
    email:"",
    password:"",
    repassword:"",
    passwordOK: false,
    errorMessage: null
  }

  handleSignup = () => {
    if (this.state.passwordOK == true) {
      fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        var user = fire.auth().currentUser;
        user.sendEmailVerification();
        fire.auth().signOut()
        .then(() => this.props.navigation.navigate('Login'))
      })
      .catch(error => this.setState({ errorMessage: error.message }))
    }
  }

  checkPasswordOK = () => {
    var strongPass = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
    if (this.state.password.length == 0){
      this.setState({passwordOK:false})
      this.setState({errorMessage:null})
    } else if (!strongPass.test(this.state.password)) {
      this.setState({passwordOK:false})
      this.setState({errorMessage:"Password should be at least 8 characters,\nwith lower/uppercase letters and a number"})
    } else if (this.state.password != this.state.repassword) {
      this.setState({passwordOK:false})
      if (this.state.repassword.length > 0) {
        this.setState({errorMessage:"Passwords do not match"})
      } else {
        this.setState({errorMessage:null})
      }
    } else {
      this.setState({passwordOK:true})
      this.setState({errorMessage:null})
    }
  }

  handlePass = text => this.setState({password:text}, this.checkPasswordOK)
  handleRepass = text => this.setState({repassword:text}, this.checkPasswordOK)

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Sign up here{"\n"}</Text>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            placeholder = "Email" 
            placeholderTextColor = "#fff"
            onChangeText = {(text) => this.setState({email:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            maxLength = {15}
            placeholder = "Password" 
            placeholderTextColor = "#fff"
            secureTextEntry = {true}
            onChangeText = {(text) => this.handlePass(text)}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            maxLength = {15}
            placeholder = "Retype Password" 
            placeholderTextColor = "#fff"
            secureTextEntry = {true}
            onChangeText = {(text) => this.handleRepass(text)}/>
        </View>
        {this.state.errorMessage &&
          <Text style={styles.errorMsg}>
            {this.state.errorMessage}
          </Text>
        }
        <TouchableOpacity 
          style={styles.submit}
          onPress={this.handleSignup.bind(this)}>
          <Text >Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.text}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
