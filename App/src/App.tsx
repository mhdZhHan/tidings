import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// context
import {UserContextProvider} from './contexts/UserContext';

// types
import {RootStackParamList} from './navigation/types';

// navigators
import StackNavigator from './navigation/MainNavigator';
import TabNavigator from './navigation/TabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <UserContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen
          name="BottomTabs"
          component={TabNavigator}
          options={{headerShown: false}}
        /> */}
          <Stack.Screen
            name="Main"
            component={StackNavigator}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
};

export default App;
