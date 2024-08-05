import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  Text,
  RefreshControl,
} from 'react-native';

// components
import ChatsHeader from '../../components/headers/ChatsHeader';
import ChatsCard from '../../components/cards/ChatsCard';

// contexts
import {useUserContext} from '../../contexts/UserContext';

// hooks & lib
import {useFetch} from '../../hooks/useFetch';
import {getFriends} from '../../lib/apiClient';

// types
import type {UserType} from '../../types';
import {useState} from 'react';

const ChatsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const {userId} = useUserContext();
  const {
    data: friends,
    isLoading,
    refetch: refetchFriends,
  } = useFetch<UserType>(() => getFriends(userId as string));

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchFriends();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={friends}
        keyExtractor={item => item._id as string}
        ListHeaderComponent={<ChatsHeader />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={{flex: 1, marginVertical: 20}}>
            <Text>No friends found</Text>
          </View>
        }
        renderItem={({item}) => <ChatsCard item={item} />}
      />
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
