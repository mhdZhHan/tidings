import {createContext, useContext, useEffect, useState} from 'react';
import {io, Socket} from 'socket.io-client';

// userContext
import {useUserContext} from './UserContext';

// types
type SocketContextProviderProps = {
  children: React.ReactNode;
};

type SocketContextType = {
  socket: Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketContextProvider = ({
  children,
}: SocketContextProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const {accessToken, userId} = useUserContext();

  useEffect(() => {
    if (accessToken) {
      const newSocket = io('http://192.168.1.75:3000', {
        query: {
          userId: userId,
        },
      });

      setSocket(newSocket);

      () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [accessToken, userId]);

  return (
    <SocketContext.Provider value={{socket, setSocket}}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketContextProvider');
  }
  return context;
};
