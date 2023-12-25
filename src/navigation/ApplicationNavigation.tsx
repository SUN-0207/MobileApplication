import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@/screens/home/HomeScreen';
import OnBoardingScreen from '@/screens/on-boarding/OnBoardingScreen';

const RootStack = createNativeStackNavigator();

export const ApplicationNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="OnBoardingScreen"
          options={{ headerShown: false }}
          component={OnBoardingScreen}
        />
        <RootStack.Screen
          name="HomeScreen"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};