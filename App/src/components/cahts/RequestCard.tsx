import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const RequestCard = () => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.userCard}>
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
        <View style={styles.info}>
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
        <TouchableOpacity
          activeOpacity={0.5}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderWidth: 1,
            borderRadius: 6,
            borderColor: '#000',
            backgroundColor: '#000',
          }}>
          <Text
            style={{
              color: '#fff',
            }}>
            Accept
          </Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.5}>
          <AntDesign name="closecircle" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default RequestCard;

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
  info: {},
  userName: {},
  labelText: {},
});
