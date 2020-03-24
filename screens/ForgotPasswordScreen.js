import React from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import fire from '../Firebase';
import styles from '../styles/Styles';

export default class ForgotPassword extends React.Component {
    state = {email:"", errorMessage: null}

    handleSignup = () => {
        fire.auth().sendPasswordResetEmail(this.state.email)
        .then(() => this.props.navigation.navigate('Login'))
        .catch(error => this.setState({ errorMessage: error.message }))
    }

    render() {
      return (
        <View style={styles.container}>
            <Text style={styles.text}>Forgot Password{"\n"}</Text>
            <Text style={{color:'white'}}>Enter your registered email and {"\n"}we will send you a password reset link:{"\n"}</Text>
            <View style={styles.inputView} >
                <TextInput  
                    style={styles.inputText}
                    placeholder = "Email" 
                    placeholderTextColor = "#fff"
                    onChangeText = {(text) => this.setState({email:text})}/>
            </View>
            {this.state.errorMessage &&
                <Text style={{ color: 'red' }}>
                    {this.state.errorMessage}
                </Text>}
            <TouchableOpacity 
                style={styles.submit}
                onPress={this.handleSignup}>
                <Text>Send email</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
        </View>
      )
    }
}
