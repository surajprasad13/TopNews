import React from 'react';
import {} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

// screens
import Home from '../screens/home/Home';
import Detail from '../screens/home/Detail';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{}}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          initialParams={{item: ''}}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
