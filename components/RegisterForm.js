import {View, Text, TextInput, Button} from 'react-native';
import React from 'react';
import {useUser} from '../hooks/ApiHooks';
import {useForm, Controller} from 'react-hook-form';
import {Card} from '@rneui/themed';

const RegisterForm = () => {
  const {postUser} = useUser();
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset, //reset funktio kentille
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      full_name: '',
    },
  });
  const register = async (userData) => {
    try {
      console.log(userData);
      await postUser(userData);
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="username"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            style={{paddingLeft: 10}}
            errorMessage={errors.username && errors.username.message}
          />
        )}
        name="username"
      />
      <Card.Divider />
      {errors.username && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 100,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            style={{paddingLeft: 10}}
          />
        )}
        name="email"
      />
      <Card.Divider />
      {errors.email && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 100,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
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
          maxLength: 100,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            style={{paddingLeft: 10}}
          />
        )}
        name="password"
      />
      {errors.password && <Text>This is required.</Text>}

      <Button title="Register!" onPress={handleSubmit(register)} />
    </View>
  );
};

export default RegisterForm;
