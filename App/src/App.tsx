import RootNavigator from './navigation/RootNavigator';

// contexts
import {UserContextProvider} from './contexts/UserContext';

const App = () => {
  return (
    <UserContextProvider>
      <RootNavigator />
    </UserContextProvider>
  );
};

export default App;
