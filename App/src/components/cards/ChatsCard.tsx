import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// types
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {UserType} from '../../types';
import type {MainStackParamList} from '../../navigation/types';

type ChatCardProps = {
  item: UserType;
};

type NavigationType = NativeStackNavigationProp<
  MainStackParamList,
  'RequestChatRoom'
>;

const ChatCard = ({item}: ChatCardProps) => {
  const navigation = useNavigation<NavigationType>();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.userCard}
      onPress={() =>
        navigation.navigate('RequestChatRoom', {
          name: item?.name ?? '',
          image: item?.image ?? '',
          receiverId: item?._id ?? '',
        })
      }>
      <Image
        source={
          item?.image ? {uri: item.image} : require('../../assets/avatar.jpg')
        }
        resizeMode="cover"
        style={{
          width: 50,
          height: 50,
          borderRadius: 9999,
        }}
      />

      <View>
        <Text
          style={{
            fontSize: 18,
            color: '#000',
            fontWeight: '700',
            marginBottom: 2,
          }}>
          {item.name}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            color: '#333',
          }}>
          Chat with {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  userCard: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 17,

    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
});
