import {useState, useLayoutEffect, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  View,
  TextInput,
  RefreshControl,
  Pressable,
} from 'react-native';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

// contexts
import {useUserContext} from '../../contexts/UserContext';
import {useSocket} from '../../contexts/SocketContext';

// lib
import {fetchMessages, sendMessage} from '../../lib/apiClient';

// hooks
import {useFetch} from '../../hooks/useFetch';

// types
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import type {MainStackParamList} from '../../navigation/types';
import {Alert} from 'react-native';
import {MessageType} from '../../types';

type ChatRoomProps = {
  navigation: NativeStackNavigationProp<MainStackParamList, 'ChatRoom'>;
  route: RouteProp<MainStackParamList, 'ChatRoom'>;
};

const ChatRoom = ({navigation, route}: ChatRoomProps) => {
  const [message, setMessage] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const {userId} = useUserContext();
  const {socket} = useSocket();

  const {name: receiverName, receiverId, image} = route.params;

  const {
    data: messages,
    isLoading,
    refetch: refetchMessages,
    setData: setMessages,
  } = useFetch<MessageType>(() =>
    fetchMessages({senderId: userId as string, receiverId}),
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await refetchMessages();
    setRefreshing(false);
  };

  const listenMessages = () => {
    useEffect(() => {
      socket?.on('newMessage', newMessage => {
        newMessage.shouldShake = true;
        setMessages([...messages, newMessage]);
      });

      return () => {
        socket?.off('newMessage');
      };
    }, [socket, messages, setMessages]);
  };

  listenMessages();

  const handleSendMessage = async () => {
    try {
      if (!userId || !receiverId || !message.length) {
        return Alert.alert('Something went wrong', 'Please try again');
      }

      const response = await sendMessage({
        senderId: userId,
        message: message,
        receiverId: receiverId,
      });

      socket?.emit('sendMessage', {userId, receiverId, message});
    } catch (error) {
      Alert.alert('Error sending message', error as string);
    } finally {
      setMessage('');
    }
  };

  const formatTime = (timestamp: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
    };
    return new Date(timestamp).toLocaleString('en-US', options);
  };

  useLayoutEffect(() => {
    return navigation.setOptions({
      headerTitle: '',
      headerStyle: {backgroundColor: '#f2f2f2'},
      headerLeft: () => (
        <>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.pop()}>
            <FontAwesome6 name="arrow-left-long" size={24} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {}}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 18,
              marginLeft: 20,
            }}>
            <Image
              source={image ? {uri: image} : require('../../assets/avatar.jpg')}
              style={{
                width: 35,
                height: 35,
                borderRadius: 999,
              }}
            />
            <Text
              style={{
                color: '#000',
                fontSize: 18,
                fontWeight: '600',
              }}>
              {receiverName}
            </Text>
          </TouchableOpacity>
        </>
      ),
    });
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        {messages.map((message, index) => (
          <Pressable
            key={message._id}
            style={[
              message.senderId._id === userId
                ? {alignSelf: 'flex-end', backgroundColor: '#000'}
                : {alignSelf: 'flex-start', backgroundColor: '#6D767E'},

              {
                paddingRight: 16,
                paddingLeft: 8,
                marginTop: 8,
                marginBottom: 4,
                maxWidth: '60%',
                borderRadius: 7,
                margin: 10,

                flexDirection: 'row',
                gap: 2,
              },
            ]}>
            <Text style={{color: '#fff', fontSize: 16}}>{message.message}</Text>
            <Text style={{color: '#fff', marginTop: 10}}>
              {formatTime(message.timeStamp)}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.chatOption}>
        <TouchableOpacity activeOpacity={0.5}>
          <MaterialIcons name="emoji-emotions" size={30} color="#000" />
        </TouchableOpacity>

        <TextInput
          value={message}
          onChangeText={setMessage}
          multiline
          placeholder="Message"
          placeholderTextColor="#333"
          style={styles.chatInput}
        />

        <View style={styles.chatActions}>
          <TouchableOpacity activeOpacity={0.5}>
            <Entypo name="camera" size={24} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.5}>
            <Feather name="mic" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleSendMessage}
          style={{
            backgroundColor: '#000',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 20,
          }}>
          <Text style={{textAlign: 'center', color: 'white'}}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'f2f2f2',
  },
  chatOption: {
    // backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#dddddd',
    // marginBottom: 20,
    borderStartWidth: 1,
    borderColor: '#000',
  },
  chatInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddddd',
    color: '#000',
    fontWeight: '600',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  chatActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 8,
  },
});
