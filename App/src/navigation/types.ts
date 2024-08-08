export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainStackParamList = {
  BottomTabs: undefined;
  Users: undefined;
  Notifications: undefined;
  RequestChatRoom: {name: string; receiverId: string; image: string};
  ChatRoom: {name: string; receiverId: string; image: string};
};

export type BottomTabParamList = {
  Chat: undefined;
  Profile: undefined;
};
