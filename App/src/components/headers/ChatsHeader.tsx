import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

// types
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import type {MainStackParamList} from '../../navigation/types';

type MainStackNavigationProp = NativeStackNavigationProp<MainStackParamList>;

const Header = () => {
  const navigation = useNavigation<MainStackNavigationProp>();

  return (
    <View style={styles.headerContainer}>
      <View
        style={{
          flex: 1,
          alignContent: 'flex-start',
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '900',
            color: '#000',
            fontStyle: 'italic',
          }}>
          Tiding
        </Text>
      </View>

      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: '500', color: '#333'}}>
          Chats
        </Text>
      </View>

      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Notifications')}>
            <FontAwesome6
              name="heart"
              size={22}
              color="#000"
              style={{fontWeight: '900'}}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Users')}>
            <FontAwesome6 name="user-group" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 70,

    borderBottomWidth: 1,
    borderColor: '#000',
  },
});
