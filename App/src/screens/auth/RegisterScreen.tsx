import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import IonIcons from 'react-native-vector-icons/Ionicons';

// components
import InputBox from '../../components/InputBox';
import CustomButton from '../../components/CustomButton';

// type
import type {RootStackParamList} from '../../navigation/types';

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Main'
>;

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<RegisterScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Join us today</Text>
        </View>

        {/* form container */}
        <View style={{marginTop: 40, width: '100%'}}>
          <InputBox
            value={name}
            setValue={setName}
            icon={<IonIcons name="person-outline" size={20} color="#000" />}
            placeholder="Full Name"
            placeholderTextColor="#000"
          />

          <InputBox
            value={email}
            setValue={setEmail}
            icon={<IonIcons name="mail-outline" size={20} color="#000" />}
            placeholder="Work email"
            placeholderTextColor="#000"
          />

          <InputBox
            value={password}
            setValue={setPassword}
            secureTextEntry
            icon={
              <IonIcons name="lock-closed-outline" size={20} color="#000" />
            }
            placeholder="Your Password"
            placeholderTextColor="#000"
          />

          <CustomButton text="Sign Up" onPress={() => {}} />

          <View style={styles.registerBtnContainer}>
            <Text style={{textAlign: 'center', color: 'gray', fontSize: 17}}>
              Already a member ?
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Main', {screen: 'Login'})}>
              <Text
                style={{
                  fontSize: 17,
                  color: 'gray',
                  textDecorationLine: 'underline',
                }}>
                Sign in here.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#000',
  },
  registerBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginVertical: 20,
  },
});
