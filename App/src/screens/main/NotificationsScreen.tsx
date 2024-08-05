import {useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  RefreshControl,
  View,
} from 'react-native';

// components
import NotificationsHeader from '../../components/headers/NotificationsHeader';
import RequestCard from '../../components/cards/RequestCard';

// lib
import {getFriendRequests} from '../../lib/apiClient';

// contexts
import {useUserContext} from '../../contexts/UserContext';
import {useFetch} from '../../hooks/useFetch';

// types
import type {RequestsType} from '../../types';

const NotificationsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const {userId} = useUserContext();

  const {
    data: chatRequests,
    isLoading,
    refetch: refetchChatRequests,
  } = useFetch<RequestsType>(() => getFriendRequests(userId as string));

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchChatRequests();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chatRequests}
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <Text
            style={{
              color: '#000',
              textAlign: 'center',
              fontSize: 18,
              marginTop: 20,
            }}>
            No notifications found
          </Text>
        }
        ListHeaderComponent={
          <View style={{marginBottom: 10}}>
            <NotificationsHeader />
          </View>
        }
        renderItem={({item}) => (
          <RequestCard refetchChatRequests={refetchChatRequests} item={item} />
        )}
      />
    </SafeAreaView>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
  },
});
