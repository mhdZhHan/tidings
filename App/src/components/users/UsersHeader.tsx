import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

// types
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {MainStackParamList} from '../../navigation/types';

type MainStackNavigationProp = NativeStackNavigationProp<MainStackParamList>;

const UsersHeader = () => {
  const navigation = useNavigation<MainStackNavigationProp>();

  return (
    <View style={styles.headerContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 20,
        }}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.pop()}>
          <FontAwesome6 name="arrow-left-long" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={{fontSize: 18, fontWeight: '900', color: '#000'}}>
          Mohammed
        </Text>
      </View>

      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <TouchableOpacity activeOpacity={0.5}>
          <Image
            source={require('../../assets/character.jpg')}
            resizeMode="cover"
            style={{
              width: 40,
              height: 40,
              borderRadius: 999,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UsersHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 70,

    borderBottomWidth: 1,
  },
});
