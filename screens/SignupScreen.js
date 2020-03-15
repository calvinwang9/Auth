import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import fire from '../Firebase';
import styles from '../styles/Styles';

export default class Signup extends React.Component {
  state = {
    email:"",
    password:"",
    errorMessage: null
  }

  handleSignup = () => {
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Login'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

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
          onPress={this.handleSignup}>
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
