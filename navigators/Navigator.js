import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../views/Home';
import Profile from '../views/Profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Single from '../views/Single';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Tabscreen = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name='Home' component={Home}></Tab.Screen>
        <Tab.Screen name='Profile' component={Profile}></Tab.Screen>
      </Tab.Navigator>
  );
};

const Stackscreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Tabs' component={Tabscreen} options={{headerShown: false}}></Stack.Screen>
      <Stack.Screen name='Single' component={Single}></Stack.Screen>
    </Stack.Navigator>
  );
};

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stackscreen></Stackscreen>
    </NavigationContainer>
  );
};

export default Navigator;
