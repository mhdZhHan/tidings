import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import IonIcons from 'react-native-vector-icons/Ionicons';

// screens
import ChatsScreen from '../screens/main/ChatsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

export type AppTabParamList = {
  Chats: undefined;
  Profile: undefined;
};

const AppTab = createBottomTabNavigator<AppTabParamList>();

const AppNavigator = () => {
  return (
    <AppTab.Navigator>
      <AppTab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          tabBarStyle: {backgroundColor: '#101010'},
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <IonIcons size={28} name="chatbubble-outline" color="#fff" />
            ) : (
              <IonIcons size={28} name="chatbubble-outline" color="#999" />
            ),
        }}
      />
      <AppTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarStyle: {backgroundColor: '#101010'},
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <IonIcons size={28} name="person-circle-sharp" color="#fff" />
            ) : (
              <IonIcons size={28} name="person-circle-sharp" color="#999" />
            ),
        }}
      />
    </AppTab.Navigator>
  );
};

export default AppNavigator;
