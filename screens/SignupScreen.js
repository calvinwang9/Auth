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
    passwordSame: false,
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

  checkPasswordSame = () => {
    if (this.state.password == this.state.repassword) {
      this.setState({passwordSame:true})
      this.setState({errorMessage:null})
    } else {
      this.setState({errorMessage:"Passwords do not match"})
    }
  }

  checkPasswordQuality = () => {
    if (this.state.password.length < 8) {
      this.setState({errorMessage:"Length of password must be at least 8 characters"})
    }
  }

  handleSamePass = text => this.setState({repassword:text}, this.checkPasswordSame)

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign up here{"\n"}</Text>
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
            onChangeText = {(text) => this.setState({password:text})}/>
        </View>
        <View style={styles.inputView} >
          <TextInput  
            style={styles.inputText}
            maxLength = {15}
            placeholder = "Retype Password" 
            placeholderTextColor = "#fff"
            secureTextEntry = {true}
            onChangeText = {(text) => this.handleSamePass(text)}/>
        </View>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>
        }
        <TouchableOpacity 
          style={styles.submit}
          onPress={this.handleSignup.bind(this)}>
          <Text>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
