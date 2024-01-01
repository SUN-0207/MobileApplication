import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@/screens/home/HomeScreen';
import { OnBoardingScreen } from '@/screens/on-boarding/OnBoardingScreen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '@/screens/login/login'; 
import axios from 'axios';

const RootStack = createNativeStackNavigator();


export const ApplicationNavigation = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(false);
  const [loading, setLoading] = useState(false);

  const triggerDeploy = async () => {
    setLoading(true);

    try {
      const response = await axios.post("https://api.render.com/deploy/srv-clpgk7hoh6hc73c32oeg?key=ymuKpOWiUpo");

      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value: any) => {
      if (value === null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    })
    if (isFirstLaunch) {
      triggerDeploy();
    }
  }, [isFirstLaunch])

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