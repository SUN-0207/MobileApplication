import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeDetailScreen from '@/screens/recipe/RecipeDetail';
import RecipeListScreen from './RecipeList';


const RecipeStack = createNativeStackNavigator();

export const Recipe = () => {

  return (
    <RecipeStack.Navigator>
      <RecipeStack.Screen
        name="RecipeListScreen"
        options={{ headerShown: false }}
        initialParams={{scanResult: "seAfOOd"}}
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