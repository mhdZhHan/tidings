import Navigator from './navigation/Navigator';

// contexts
import {UserContextProvider} from './contexts/UserContext';
import {SocketContextProvider} from './contexts/SocketContext';

const App = () => {
  return (
    <UserContextProvider>
      <SocketContextProvider>
        <Navigator />
      </SocketContextProvider>
    </UserContextProvider>
  );
};

export default App;
