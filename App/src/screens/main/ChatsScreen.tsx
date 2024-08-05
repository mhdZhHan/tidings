import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ChatsHeader from '../../components/headers/ChatsHeader';
import ChatsCard from '../../components/cards/ChatsCard';
import RequestCard from '../../components/cards/RequestCard';

const ChatsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ChatsHeader />

        <View style={{flex: 1, marginVertical: 10}}>
          <ChatsCard />
          <ChatsCard />
          <ChatsCard />
          <ChatsCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
});
