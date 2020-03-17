import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import fire from '../Firebase';
import styles from '../styles/Styles';

export default class Login extends React.Component {
  state = {
    email:"",
    password:"",
    errorMessage: null
  }

  anonLogin = () => {
    fire.auth().signInAnonymously()
      .then(() => this.props.navigation.navigate('Home', {type: 'anon'}))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  userLogin = () => {
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Home', {type: 'cred'}))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  render () {
    return (
      <View style={styles.container}>
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
            placeholder = "Password" 
            placeholderTextColor = "#fff"
            secureTextEntry = {true}
            onChangeText = {(text) => this.setState({password:text})}/>
        </View>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TouchableOpacity 
          style={styles.submit}
          onPress={this.userLogin}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.submit}
          onPress={this.anonLogin}>
          <Text>Sign in as guest</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Signup')}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ForgotPassword')}>
          <Text>Forgot password?</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
}

