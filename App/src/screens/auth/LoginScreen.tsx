import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useEffect, useState} from 'react';

import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import IonIcons from 'react-native-vector-icons/Ionicons';

// lib
import {login} from '../../lib/apiClient';

// contexts
import {useUserContext} from '../../contexts/UserContext';

// components
import InputBox from '../../components/InputBox';
import CustomButton from '../../components/CustomButton';

// type
import type {AuthStackParamList} from '../../navigation/AuthNavigator';
import type {RootStackParamList} from '../../navigation/RootNavigator';

type LoginScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<AuthStackParamList, 'Login'>,
  NativeStackNavigationProp<RootStackParamList>
>;

const LoginScreen = () => {
  const [email, setEmail] = useState('hello@example.com');
  const [password, setPassword] = useState('Hello123');
  const [isLogin, setIsLogin] = useState(false);

  const {updateUserData, accessToken} = useUserContext();

  const navigation = useNavigation<LoginScreenNavigationProp>();

  useEffect(() => {
    if (accessToken) {
      navigation.replace('App');
    }
  }, [accessToken, navigation]);

  const handleLogin = async () => {
    setIsLogin(true);
    try {
      const response = await login({email, password});
      const token = response.access_token;
      updateUserData({
        type: 'LOGIN',
        payload: {accessToken: token},
      });
    } catch (error) {
    } finally {
      setEmail('');
      setPassword('');
      setIsLogin(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>🤝 Welcome back</Text>
        </View>

        {/* form container */}
        <View style={{marginTop: 40, width: '100%'}}>
          <InputBox
            value={email}
            setValue={setEmail}
            icon={<IonIcons name="mail-outline" size={20} color="#000" />}
            placeholder="Work email"
            placeholderTextColor="#000"
          />

          <InputBox
            value={password}
            secureTextEntry
            setValue={setPassword}
            icon={
              <IonIcons name="lock-closed-outline" size={20} color="#000" />
            }
            placeholder="Your Password"
            placeholderTextColor="#000"
          />

          <CustomButton
            text={isLogin ? 'Login...' : 'Login'}
            disabled={isLogin}
            onPress={handleLogin}
          />

          <View style={styles.registerBtnContainer}>
            <Text style={{textAlign: 'center', color: 'gray', fontSize: 17}}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Register')}>
              <Text
                style={{
                  fontSize: 17,
                  color: 'gray',
                  textDecorationLine: 'underline',
                }}>
                Join us today
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
