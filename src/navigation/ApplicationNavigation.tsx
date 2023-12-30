import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@/screens/home/HomeScreen';
import { OnBoardingScreen } from '@/screens/on-boarding/OnBoardingScreen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '@/screens/login/login'; 

const RootStack = createNativeStackNavigator();

export const ApplicationNavigation = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value: any) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    })
  }, [])

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="OnBoarding"
          options={{ headerShown: false }}
          component={OnBoardingScreen}
        />
         <RootStack.Screen
          name="Login"
          options={{ headerShown: false }}
          component={Login}
        />
        <RootStack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeScreen}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};