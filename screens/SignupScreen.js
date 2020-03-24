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
    if (passwordOK == true) {
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
    if (this.state.password.length < 8 && this.state.password.length > 0) {
      this.setState({passwordOK:false})
      this.setState({errorMessage:"Length of password must be at least 8 characters"})
    } else if (this.state.password != this.state.repassword) {
      this.setState({passwordOK:false})
      this.setState({errorMessage:"Passwords do not match"})
    } else if (this.state.password.length == 0) {
      this.setState({errorMessage:null})
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
          <Text style={{ color:'#F7567C'}}>
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
