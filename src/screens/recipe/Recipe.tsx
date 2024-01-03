import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeDetailScreen from '@/screens/recipe/RecipeDetail';
import RecipeListScreen from './RecipeList';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const RecipeStack = createNativeStackNavigator();

interface SearchInfo { 
  route: any;
}

export const Recipe = ({route}: any) => {
  const [oldValue, setOldValue] = useState('')
  const navigation = useNavigation();
  useEffect(() => {
    if(route.params && route.params.props != oldValue){
      setOldValue(route.params?.props)
      navigation.navigate('RecipeListScreen' , {scanResult: route.params.props}) 
    }
  }, [route]);
  return (
    <RecipeStack.Navigator>
      <RecipeStack.Screen
        name="RecipeListScreen"
        options={{ headerShown: false }}
        initialParams={{scanResult: route.params?.props}}  
        component={RecipeListScreen}
      />
      <RecipeStack.Screen
        name="RecipeDetailScreen"
        options={{ headerShown: false }}
        component={RecipeDetailScreen}
      />
    </RecipeStack.Navigator>
  );
};