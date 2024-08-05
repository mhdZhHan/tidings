import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

// types
import type {UserType} from '../../types';

type ChatCardProps = {
  item: UserType;
};

const ChatCard = ({item}: ChatCardProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.userCard}>
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
