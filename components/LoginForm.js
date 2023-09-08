import React, {useContext} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useAuthentication} from '../hooks/ApiHooks';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card,Button, Input} from '@rneui/themed';
import { Alert } from 'react-native';

const LoginForm = () => {
  const {postLogin} = useAuthentication();
  const {setIsLoggedIn, setUser} = useContext(MainContext);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const logIn = async (loginData) => {
    console.log('Button pressed');
    try {
      const loginResponse = await postLogin(loginData);
      console.log('login response', loginResponse);
      await AsyncStorage.setItem('userToken', loginResponse.token);
      setIsLoggedIn(true);
      setUser(loginResponse.user);
    } catch (error) {
      Alert.alert("Error", error.message)
    }
  };
  return (
    <Card>
       <Card.Title>Login Form</Card.Title>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: "is required"},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            style={{paddingLeft: 10}}
            errorMessage={errors.username?.message}
          />
        )}
        name="username"
      />
      <Card.Divider />

      <Controller
        control={control}
        rules={{
          required: {value: true, message: "is required"},
          maxLength: 100,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="password"
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            style={{paddingLeft: 10}}
            errorMessage={errors.password?.message}
          />
        )}
        name="password"
      />
      <Button title="Login" onPress={handleSubmit(logIn)} />
    </Card>
  );
};
export default LoginForm;
