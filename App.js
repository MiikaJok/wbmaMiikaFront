import {StatusBar} from 'expo-status-bar';
import {SafeAreaView} from 'react-native';
import List from './components/List';

const App = () => {
  return (
    <SafeAreaView>
      <List />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
export default App;
