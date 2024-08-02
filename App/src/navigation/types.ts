import {NavigatorScreenParams} from '@react-navigation/native';

export type MainParamList = {
  Login: undefined;
  Register: undefined;
};

export type TabParamList = {
  Chats: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainParamList>;
  BottomTabs: NavigatorScreenParams<TabParamList>;
};
