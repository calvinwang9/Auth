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
    fire.auth().signOut()
      .then(() => this.props.navigation.navigate('Login'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  renderMessage = () => {
    if (this.state.anonUser) {
      return <Text>Welcome Anon</Text>;
    } else {
      if (this.state.verified) {
        return <Text>Welcome {this.state.email}{"\n"}Your email is verified.</Text>
      } else {
        return <Text>Welcome {this.state.email}{"\n"}Your email needs to be verified.</Text>
      }
    }
  }
  

  render() {
    return (
      <View style={styles.container}>
        {<this.renderMessage/>}
        <TouchableOpacity
          onPress={this.handleSignOut}>
          <Text>Log out</Text>
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
