import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

// contexts
import {useUserContext} from '../../contexts/UserContext';

// components
import RectButton from '../buttons/RectButton';

// lib
import {acceptFriendRequests} from '../../lib/apiClient';

// types
import {RequestsType} from '../../types';

type RequestCardProps = {
  item: RequestsType;
  refetchChatRequests: () => Promise<void>;
};

const RequestCard = ({item, refetchChatRequests}: RequestCardProps) => {
  const {userId} = useUserContext();

  const handleAcceptRequest = async () => {
    try {
      const {status} = await acceptFriendRequests(
        userId as string,
        item.from._id,
      );

      if (status === 200) {
        await refetchChatRequests();
      }
    } catch (error) {
      console.log('Error', error);
    }
  };
  return (
    <View style={styles.reqCard}>
      <View style={styles.cardLeft}>
        <Image
          source={
            item.from.image
              ? {uri: item.from.image}
              : require('../../assets/avatar.jpg')
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
            {item.from.name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              color: '#333',
            }}>
            {item.message}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 18,
        }}>
        <RectButton text="Accept" onPress={handleAcceptRequest} />

        <TouchableOpacity activeOpacity={0.5}>
          <AntDesign name="closecircle" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RequestCard;

const styles = StyleSheet.create({
  reqCard: {
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
    gap: 10,
  },
});
