import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthentication} from '../hooks/ApiHooks';

const Login = ({navigation}) => {
  const {setIsLoggedIn} = useContext(MainContext);
  const {postLogin} = useAuthentication();

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      //hardcoded token
      if (token === 'abcde') {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    checkToken();
  }, []);

  const logIn = async () => {
    console.log('Button pressed');
    try {
      const loginResponse = await postLogin({
        username: 'john',
        password: 'examplepass'
      });
      console.log("login response", loginResponse);
      //TODO: fix doFetch() to display errors from API (e.g. bad user/pw)
      //use loginResponse.user for storing token & userdata
      await AsyncStorage.setItem('userToken', 'abcde');
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      //TODO: Notify user about failed login?
    }
  };
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in!" onPress={logIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
