import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

// components
import RectButton from '../buttons/RectButton';

// types
import type {UserType} from '../../types';

type UserCardProps = {
  item: UserType;
};

const UserCard = ({item}: UserCardProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.userCard}>
      <View style={styles.cardLeft}>
        <Image
          source={
            item.image ? {uri: item.image} : require('../../assets/avatar.jpg')
          }
          resizeMode="cover"
          style={{
            width: 40,
            height: 40,
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
              fontSize: 12,
              fontWeight: '500',
              color: '#333',
            }}>
            {/* username future */}
            Chat with {item.name}
          </Text>
        </View>
      </View>

      <RectButton text="Chat" onPress={() => {}} />
    </TouchableOpacity>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,

    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cardLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 17,
  },
});
