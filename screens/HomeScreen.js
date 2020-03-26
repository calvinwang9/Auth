import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import fire from '../Firebase';
import styles from '../styles/Styles';

export default class Home extends React.Component {
  state = {
    user: this.props.navigation.getParam('type', 'anon'),
    name: "",
    email: fire.auth().currentUser.email,
    verified: fire.auth().currentUser.emailVerified,
    provider: 'guest',
    errorMessage: null
  }

  handleSignOut = () => {
    if (fire.auth().currentUser.isAnonymous) {
      fire.auth().currentUser.delete()
      .then(() => console.log("deleted anon user"))
      .catch(error => this.setState({ errorMessage: error.message }))
    }
    fire.auth().signOut()
      .then(() => this.props.navigation.navigate('Login'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  componentDidMount() {
    if (fire.auth().currentUser.providerData[0]) {
      const userData = fire.auth().currentUser.providerData[0];
      console.log("logged in with: " + userData.providerId);
      this.setState({
        name: userData.displayName,
        email: userData.email,
        verified: true,
        provider: userData.providerId
      });
    } 
    if (fire.auth().currentUser.isAnonymous) {
      this.setState({
        name: 'Anon'
      })
    }
  }
  

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}> Welcome {this.state.name}</Text>
        <Text style={styles.text}>Email: {this.state.email}</Text>
        <Text style={styles.text}>Verified: {this.state.verified ? 'Yep' : 'Nope'}</Text>
        <Text style={styles.text}>Login: {this.state.provider}</Text>
        <TouchableOpacity
          onPress={this.handleSignOut}>
          <Text style={styles.text}>Log out</Text>
        </TouchableOpacity>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>
        }
      </View>
    );
  }
}
