import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// screens
import ChatsScreen from '../screens/main/ChatsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import UsersScreen from '../screens/main/UsersScreen';
import NotificationsScreen from '../screens/main/NotificationsScreen';
import RequestChatRoom from '../screens/main/RequestChatRoom';
import ChatRoom from '../screens/main/ChatRoom';

// contexts
import {useUserContext} from '../contexts/UserContext';

// types
import {
  AuthStackParamList,
  MainStackParamList,
  BottomTabParamList,
} from './types';

const Stack = createNativeStackNavigator<MainStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

const Navigator = () => {
  const {accessToken} = useUserContext();

  function BottomTabs() {
    return (
      <Tab.Navigator screenOptions={{tabBarStyle: {backgroundColor: '#000'}}}>
        <Tab.Screen
          name="Chat"
          component={ChatsScreen}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons name="chatbubble-outline" size={24} color="#fff" />
              ) : (
                <Ionicons name="chatbubble-outline" size={24} color="#989898" />
              ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) =>
              focused ? (
                <Ionicons name="person-circle-sharp" size={24} color="#fff" />
              ) : (
                <Ionicons
                  name="person-circle-sharp"
                  size={24}
                  color="#989898"
                />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  function AuthStackNavigator() {
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
  }

  function MainStackNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Users"
          component={UsersScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="ChatRoom" component={ChatRoom} />
        <Stack.Screen name="RequestChatRoom" component={RequestChatRoom} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {accessToken ? <MainStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default Navigator;
