import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
// import { GoogleSignin } from '@react-native-community/google-signin';
// import { GoogleSignin } from 'react-native-google-signin';
import * as Facebook from 'expo-facebook';
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

  signinFacebook = async () => {
    const appid = '294356371550090';
    const permissions = ['public_profile', 'email'];
    Facebook.initializeAsync(appid, 'Auth');
    const {type, token} = await Facebook.logInWithReadPermissionsAsync(appid, {permissions});
    
    if (type == 'success') {
      const credential = fire.auth.FacebookAuthProvider.credential(token);
      fire.auth().signInWithCredential(credential)
        .then(() => this.props.navigation.navigate('Home', {type: 'cred'}))
        .catch(error => this.setState({ errorMessage: error.message }))
      return Promise.resolve({type: 'success'});
    } else if (type == 'cancel') {
      return Promise.reject({type: 'cancel'});
    }
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
          <Text style={styles.errorMsg}>
            {this.state.errorMessage}
          </Text>
        }
        {fire.auth().currentUser && // for debugging: should not display unless broke
          <Text>Current user: {fire.auth().currentUser.email}</Text>
        }
        <TouchableOpacity 
          style={styles.submit}
          onPress={this.userLogin}>
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.submit}
          onPress={this.signinFacebook}>
          <Text>Facebook sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.submit}
          onPress={this.anonLogin}>
          <Text>Sign in as guest</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Signup')}>
          <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ForgotPassword')}>
          <Text style={styles.text}>Forgot password?</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
}

