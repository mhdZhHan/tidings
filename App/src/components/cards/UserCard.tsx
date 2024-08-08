import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// components
import RectButton from '../buttons/RectButton';

// types
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {UserType} from '../../types';
import type {MainStackParamList} from '../../navigation/types';

type MainStackNavigationProp = NativeStackNavigationProp<MainStackParamList>;

type UserCardProps = {
  item: UserType;
};

const UserCard = ({item}: UserCardProps) => {
  const navigation = useNavigation<MainStackNavigationProp>();

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

      <RectButton
        text="Chat Request"
        onPress={() =>
          navigation.navigate('RequestChatRoom', {
            name: item?.name as string,
            receiverId: item?._id as string,
            image: item?.image as string,
          })
        }
      />
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
    borderBottomWidth: 1,
  },
  cardLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 17,
  },
});
