import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  state = {
    email:"",
    password:""
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputView} >
        <TextInput  
          // style={styles.inputText}
          placeholder = "Email" 
          placeholderTextColor = "#003f5c"
          onChangeText = {text => this.setState({email:text})}/>
      </View>
      <View style={styles.inputView} >
        <TextInput  
          // style={styles.inputText}
          placeholder = "Password" 
          placeholderTextColor = "#003f5c"
          secureTextEntry = {true}
          onChangeText = {text => this.setState({password:text})}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  }
});
