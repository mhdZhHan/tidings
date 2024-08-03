import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

// components
import RectButton from '../buttons/RectButton';

const RequestCard = () => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.reqCard}>
      <View style={styles.cardLeft}>
        <Image
          source={require('../../assets/avatar.jpg')}
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
            Mohammed
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              color: '#333',
            }}>
            Chat with Mohammed
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 20,
        }}>
        <RectButton text="Accept" onPress={() => {}} />

        <TouchableOpacity activeOpacity={0.5}>
          <AntDesign name="closecircle" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
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
  },
  cardLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 17,
  },
});
