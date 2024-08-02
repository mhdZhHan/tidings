import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import IonIcons from 'react-native-vector-icons/Ionicons';

// screens
import ChatsScreen from '../screens/main/ChatsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

// types
import {TabParamList} from './types';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator<TabParamList>();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          tabBarStyle: {backgroundColor: '#101010'},
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <IonIcons name="chatbubble-outline" color="#fff" />
            ) : (
              <IonIcons name="chatbubble-outline" color="#999" />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarStyle: {backgroundColor: '#101010'},
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <IonIcons name="person-circle-sharp" color="#fff" />
            ) : (
              <IonIcons name="person-circle-sharp" color="#999" />
            ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
