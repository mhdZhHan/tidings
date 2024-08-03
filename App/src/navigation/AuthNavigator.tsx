import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
