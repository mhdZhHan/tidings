import Navigator from './navigation/Navigator';

// contexts
import {UserContextProvider} from './contexts/UserContext';

const App = () => {
  return (
    <UserContextProvider>
      <Navigator />
    </UserContextProvider>
  );
};

export default App;
