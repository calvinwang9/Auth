import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import fire from '../Firebase';
import styles from '../styles/Styles';

export default class Home extends React.Component {
  state = {
    user: this.props.navigation.getParam('type', 'anon'),
    email: fire.auth().currentUser.email,
    errorMessage: null
  }

  handleSignOut = () => {
    fire.auth().signOut()
      .then(() => this.props.navigation.navigate('Login'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }
  

  render() {
    return (
      <View style={styles.container}>
        {this.state.user == 'anon' &&
          <Text>Welcome Anon</Text>
        }
        {this.state.user == 'cred' &&
          <Text>Welcome {this.state.email}</Text>
        }
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
