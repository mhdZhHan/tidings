import {useState, useLayoutEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  View,
  TextInput,
} from 'react-native';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

// contexts
import {useUserContext} from '../../contexts/UserContext';

// types
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import type {MainStackParamList} from '../../navigation/types';

type ChatRoomProps = {
  navigation: NativeStackNavigationProp<MainStackParamList, 'ChatRoom'>;
  route: RouteProp<MainStackParamList, 'ChatRoom'>;
};

const ChatRoom = ({navigation, route}: ChatRoomProps) => {
  const [message, setMessage] = useState('');
  const {accessToken, userId} = useUserContext();

  const {name, receiverId, image} = route.params;

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
              {name}
            </Text>
          </TouchableOpacity>
        </>
      ),
    });
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView></ScrollView>

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
