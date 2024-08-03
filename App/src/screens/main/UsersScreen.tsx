import {useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from 'react-native';

// components
import UsersHeader from '../../components/users/UsersHeader';
import ContactCard from '../../components/cards/ContactCard';

// lib
import {getUsers} from '../../lib/apiClient';

// contexts
import {useUserContext} from '../../contexts/UserContext';
import {useFetch} from '../../hooks/useFetch';

// types
import type {UserType} from '../../types';

const UsersScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const {userId} = useUserContext();

  const {
    data: users,
    isLoading,
    refetch: refetchUsers,
  } = useFetch<UserType>(() => getUsers(userId as string));

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchUsers();
    setRefreshing(false);
  };

  console.log('Hello', users);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={item => item._id as string}
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
            App Maintenance Please wait some time
          </Text>
        }
        ListHeaderComponent={
          <>
            <UsersHeader />
          </>
        }
        renderItem={({item}) => <ContactCard />}
      />
    </SafeAreaView>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
  },
});
