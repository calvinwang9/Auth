import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
// import {auth} from "../Fire";

export default class Login extends React.Component {
  state = {
      email:"",
      password:""
  }

  handleLogin = () => {
    // auth.signInWithEmailAndPassword(this.state.email, this.state.password)
    //   .then(() => this.props.navigation.navigate('Home'))
    //   .catch(error => this.setState({ errorMessage: error.message }))
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
        <TouchableOpacity>
          <Text>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.login}
          onPress={() => this.handleLogin}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputText:{
    height:50,
    color:"white"
  },

  inputView:{
    width:"80%",
    backgroundColor:"#D3D3D3",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },

  login:{
    width:"80%",
    backgroundColor:"#fb5b5a",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  }
});
