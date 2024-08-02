import {createContext, useContext, useEffect, useState} from 'react';

// types
type userContextProviderProps = {
  children: React.ReactNode;
};

type UserType = {
  email: string;
};

// =====================
type LoginAction = {
  type: 'LOGIN';
  payload: {user: UserType; accessToken: string | null};
};

type LogoutAction = {
  type: 'LOGOUT';
};

type UpdateUserDataType = LoginAction | LogoutAction;
// =====================

type UserContextType = {
  user: UserType | null;
  accessToken: string | null;
  updateUserData: (action: UpdateUserDataType) => Promise<void>;
};

export const UserContext = createContext<UserContextType>(
  {} as UserContextType,
);

export const UserContextProvider = ({children}: userContextProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const updateUserData = async (action: UpdateUserDataType) => {
    switch (action.type) {
      case 'LOGIN':
        setUser(action.payload.user);
        setAccessToken(action.payload.accessToken);
        break;
      case 'LOGOUT':
        setUser(null);
        setAccessToken(null);
        break;
    }
  };

  return (
    <UserContext.Provider value={{user, accessToken, updateUserData}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
