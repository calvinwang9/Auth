import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles/Styles';

export default class Home extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Nice!</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text>Log out</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
