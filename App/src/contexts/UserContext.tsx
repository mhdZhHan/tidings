import {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

// types
type userContextProviderProps = {
  children: React.ReactNode;
};

// =====================
type LoginAction = {
  type: 'LOGIN';
  payload: {accessToken: string};
};

type LogoutAction = {
  type: 'LOGOUT';
};

type UpdateUserDataType = LoginAction | LogoutAction;
// =====================

type UserContextType = {
  userId: string | null;
  accessToken: string | null;
  updateUserData: (action: UpdateUserDataType) => Promise<void>;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType,
);

export const UserContextProvider = ({children}: userContextProviderProps) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const updateUserData = async (action: UpdateUserDataType) => {
    switch (action.type) {
      case 'LOGIN':
        const token = action.payload.accessToken;
        const decodedUserId: {userId: string} = jwtDecode(token);

        await AsyncStorage.setItem('authToken', token);
        setAccessToken(action.payload.accessToken);

        setUserId(decodedUserId.userId);
        break;
      case 'LOGOUT':
        await AsyncStorage.removeItem('authToken');
        setUserId(null);
        setAccessToken(null);
        break;
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        try {
          const decodedUserId: {userId: string} = jwtDecode(token);
          setAccessToken(token);
          setUserId(decodedUserId.userId);
        } catch (error) {
          console.error('Failed to decode token:', error);
          setUserId(null);
          setAccessToken(null);
        }
      }
    };

    getUser();
  }, []);

  return (
    <UserContext.Provider value={{userId, accessToken, updateUserData}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
