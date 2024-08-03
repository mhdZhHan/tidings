import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';

// contexts
import {useUserContext} from '../contexts/UserContext';

export type RootStackParamList = {
  Auth: undefined;
  App: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const {accessToken} = useUserContext();

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {accessToken ? (
          <RootStack.Screen name="App" component={AppNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
