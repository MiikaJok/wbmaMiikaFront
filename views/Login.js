import React, {useContext, useEffect} from 'react';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Text} from '@rneui/themed';
import { View } from 'react-native';


const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await getUserByToken(token);
      console.log('token', token);
      console.log('userdata', userData);
      if (userData) {
        setIsLoggedIn(true);
        setUser(userData);
      }
    } catch (error) {
      console.log('check token', error);
    }
  };
  useEffect(() => {
    checkToken();
  }, []);
  return (
    <View>
      <Text h4>Login</Text>
        <LoginForm />
      <Text h4>Register</Text>
        <RegisterForm />
    </View>
  );
};
const containerStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
