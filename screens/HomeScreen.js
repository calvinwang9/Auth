import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import fire from '../Firebase';
import styles from '../styles/Styles';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    var userDetails = fire.auth().currentUser;
    this.state = {
      user: this.props.navigation.getParam('type', 'anon'),
      name: userDetails.displayName,
      email: userDetails.email
    }
    
  }
  

  render() {
    return (
      <View style={styles.container}>
        {this.state.user == 'anon' &&
          <Text>Welcome Anon</Text>
        }
        {this.state.user == 'cred' &&
          <Text>Welcome {this.state.name}</Text>
        }
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text>Log out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
