import React, { useContext } from 'react';
import {useUser} from '../hooks/ApiHooks';
import {useForm, Controller} from 'react-hook-form';
import {Card, Button, Input} from '@rneui/themed';
import {Alert} from 'react-native';
import {PropTypes} from 'prop-types';

import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileForm = ({user}) => {
  const {putUser, checkUsername, getUserByToken} = useUser();
  const {setUser} = useContext(MainContext);
  const {
    control,
    handleSubmit,
    getValues,
    formState: {errors},
  } = useForm({
    defaultValues: {...user,password: "", confirm_password: ""},
    mode: 'onBlur',
  });
  const update = async (updateData) => {
    try {
      delete updateData.confirm_password;
      //poistetaan tyhjät arvot formia lähettäessä
      for(const [i, value] of Object.entries(updateData)){
        console.log(i,value);
        if(value === "") {
          delete updateData[i];
        }
      }
      console.log("toimiiko", updateData);
      const token = await AsyncStorage.getItem('userToken');
      const updateResult = await putUser(updateData, token);
      Alert.alert('Success!', updateResult.message);
      //päivitä käyttäjätiedot ruudulla
      const userData = await getUserByToken(token);
      setUser(userData);

    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  return (
    <Card>
      <Card.Title>Profile</Card.Title>
      <Controller
        control={control}
        rules={{
          minLength: {value: 3, message: 'min length is 3 characters'},
          validate: async (value) => {
            try {
              if(value.length<3) {
                return;
              }
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
          validate: (value) => {
            const {password} = getValues();
            if(password.length<5){
              return;
            }
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

      <Button title="Update!" onPress={handleSubmit(update)} />
    </Card>
  );
};
ProfileForm.propTypes= {
  user: PropTypes.object,
}
export default ProfileForm;
