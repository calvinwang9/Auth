import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Login from './screens/LoginScreen';
import Home from './screens/HomeScreen';
import Signup from './screens/SignupScreen';
import ForgotPassword from './screens/ForgotPasswordScreen';

const RootStack = createSwitchNavigator(
    {
    Home: { screen: Home },
    Login: { screen: Login },
    Signup: { screen: Signup },
    ForgotPassword: { screen: ForgotPassword }
    }, {
    initialRouteName: 'Login'
    });

const AppNavigator = createAppContainer(RootStack);

export default AppNavigator;