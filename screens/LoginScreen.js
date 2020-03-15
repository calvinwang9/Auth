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

  handleLogin = () => {
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Home'))
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
          onPress={this.handleLogin}>
          <Text>Login</Text>
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

