import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeDetailScreen from '@/screens/recipe/RecipeDetail';
import RecipeListScreen from './RecipeList';
import React, { useEffect, useState } from 'react';

const RecipeStack = createNativeStackNavigator();

interface SearchInfo { 
  route: any;
}

export const Recipe = ({route}: any) => {
 
  return (
    <RecipeStack.Navigator>
      <RecipeStack.Screen
        name="RecipeListScreen"
        options={{ headerShown: false }}
        initialParams={{scanResult: 'pork'}}  
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