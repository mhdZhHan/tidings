import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
const ChatCard = () => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.userCard}>
      <Image
        source={require('../../assets/avatar.jpg')}
        resizeMode="cover"
        style={{
          width: 50,
          height: 50,
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
            fontSize: 14,
            fontWeight: '500',
            color: '#333',
          }}>
          Chat with Mohammed
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
  },
  info: {},
  userName: {},
  labelText: {},
});
