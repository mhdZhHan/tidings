import {createContext, useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

// lib
import {clearStorage, getStorage, setStorage} from '../lib/asyncStorageHelpers';

// type
import type {UserType} from '../types/User.type';

type UserContextProviderProps = {
  children: React.ReactNode;
};

type LoginAction = {type: 'LOGIN'; payload: UserType};

type LogoutAction = {type: 'LOGOUT'};

type UpdateUserDataActionType = LoginAction | LogoutAction;

type UserContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  updateUserData: (action: UpdateUserDataActionType) => Promise<void>;
};

export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({children}: UserContextProviderProps) => {
  const navigation = useNavigation();

  const [user, setUser] = useState<UserType | null>(null);

  const updateUserData = async (action: UpdateUserDataActionType) => {
    switch (action.type) {
      case 'LOGOUT':
        //
        await clearStorage();
        setUser(null);
        break;
      case 'LOGIN':
        setUser(action?.payload);
        await setStorage<UserType>('user', action.payload);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    getStorage<UserType>('user')
      .then(data => {
        if (data) {
          setUser(data);
        } else {
          setUser(null);
        }
      })
      .catch(error => setUser(null));
  }, []);

  return (
    <UserContext.Provider value={{user, setUser, updateUserData}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
