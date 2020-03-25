import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import fire from '../Firebase';
import styles from '../styles/Styles';

export default class Home extends React.Component {
  state = {
    user: this.props.navigation.getParam('type', 'anon'),
    email: fire.auth().currentUser.email,
    verified: fire.auth().currentUser.emailVerified,
    anonUser: fire.auth().currentUser.isAnonymous,
    errorMessage: null
  }

  handleSignOut = () => {
    if (this.state.anonUser) {
      fire.auth().currentUser.delete()
      .then(() => console.log("deleted anon user"))
      .catch(error => this.setState({ errorMessage: error.message }))
    }
    fire.auth().signOut()
      .then(() => this.props.navigation.navigate('Login'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }
  

  render() {
    return (
      <View style={styles.container}>
        {this.state.anonUser
          ? <Text style={styles.text}>Welcome Anon</Text>
          : <Text style={styles.text}> Welcome {this.state.email}</Text>
        }
        <Text style={styles.text}>Verified: {this.state.verified ? 'Yep' : 'Nope'}</Text>

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
