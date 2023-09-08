import React from 'react';
import {useUser} from '../hooks/ApiHooks';
import {useForm, Controller} from 'react-hook-form';
import {Card, Button, Input} from '@rneui/themed';
import {Alert} from 'react-native';
import {PropTypes} from 'prop-types';

const RegisterForm = ({setToggleRegister}) => {
  const {postUser, checkUsername} = useUser();
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
    reset, //reset funktio kentille
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      full_name: '',
    },
    mode: 'onBlur',
  });
  const register = async (userData) => {
    try {
      delete userData.confirm_password;
      console.log(userData);
      const registerResponse = await postUser(userData);
      Alert.alert('Success!', registerResponse.message);
      setToggleRegister(false);

    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  return (
    <Card>
      <Card.Title>Registration form</Card.Title>
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          minLength: {value: 3, message: 'min length is 3 characters'},
          validate: async (value) => {
            try {
              const isAvailable = await checkUsername(value);
              console.log('username available?', value, isAvailable);
              return isAvailable ? isAvailable : 'Username taken';
            } catch (error) {
              console.error(error);
            }
          },
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
          required: {value: true, message: 'is required'},
          pattern: {
            value: /\S+@\S+\.\S+$/,  ///^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,8}$/,
            message: 'must be a valid email',
            maxLength: 100,
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            style={{paddingLeft: 10}}
            errorMessage={errors.email?.message}
          />
        )}
        name="email"
      />
      <Card.Divider />

      <Controller
        control={control}
        rules={{
          minLength: {value: 3, message: 'min length is 3 characters'},
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="fullname"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            style={{paddingLeft: 10}}
          />
        )}
        name="full_name"
      />
      <Card.Divider />
      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          minLength: {value: 5, message: 'min length is 5 charactgers'},
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

      <Controller
        control={control}
        rules={{
          required: {value: true, message: 'is required'},
          validate: (value) => {
            const {password} = getValues();
            return value === password ? true : "Passwords don't match";
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Confirm  password"
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            style={{paddingLeft: 10}}
            errorMessage={errors.confirm_password?.message}
          />
        )}
        name="confirm_password"
      />

      <Button title="Register!" onPress={handleSubmit(register)} />
    </Card>
  );
};
RegisterForm.propTypes= {
  setToggleRegister:PropTypes.func,

}

export default RegisterForm;
