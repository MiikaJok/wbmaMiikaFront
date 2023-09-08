import React, {useContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Button} from '@rneui/themed';
import {Platform,TouchableOpacity,Keyboard, KeyboardAvoidingView} from 'react-native';

const Login = ({navigation}) => {
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {getUserByToken} = useUser();
  const [toggleRegister, setToggleRegister] = useState(false);

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

    <TouchableOpacity
      onPress={() => Keyboard.dismiss()}
      style={{ flex: 1 }}
      activeOpacity={1}>

     <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      {toggleRegister ? <RegisterForm setToggleRegister={setToggleRegister} /> : <LoginForm />}
      <Button
        onPress={() => {
          setToggleRegister(!toggleRegister);
        }}
      >{toggleRegister ? "Or login" : "Or register"}</Button>
       </KeyboardAvoidingView>
    </TouchableOpacity>

  );
};
Login.propTypes = {
  navigation: PropTypes.object,

};

export default Login;
