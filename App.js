import React, { useEffect, useState } from 'react';
import {
  View,Text, StyleSheet, Modal, TextInput, Button
} from 'react-native';
import Home from './src/components/Home';
import { createStackNavigator} from "@react-navigation/stack" 
import { NavigationContainer } from '@react-navigation/native';
import SafecamWrapper from './src/components/SafecamWrapper';


const Stack = createStackNavigator()
const App = () => {
 
  return (
  <NavigationContainer >
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{headerShown: true, title: 'Home', headerLeft: () => {}}}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="SafecamWrapper"
        component={SafecamWrapper}
      />
    </Stack.Navigator>

  </NavigationContainer>
  
  )
};




export default App;
