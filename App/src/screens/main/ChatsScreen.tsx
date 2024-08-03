import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/cahts/Header';
import ChatsCard from '../../components/cahts/ChatsCard';
import RequestCard from '../../components/cahts/RequestCard';

const ChatsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header />

        <View style={{flex: 1, marginVertical: 20}}>
          <ChatsCard />
          <ChatsCard />
          <ChatsCard />
          <ChatsCard />
        </View>

        <View style={{flex: 1, marginVertical: 20}}>
          <RequestCard />
          <RequestCard />
          <RequestCard />
          <RequestCard />
          <RequestCard />
          <RequestCard />
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
