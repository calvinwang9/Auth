import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Login from './screens/LoginScreen';
import Home from './screens/HomeScreen';

const RootStack = createSwitchNavigator(
    {
    Home: { screen: Home },
    Login: { screen: Login }
    }, {
    initialRouteName: 'Login'
    });

const AppNavigator = createAppContainer(RootStack);

export default AppNavigator;