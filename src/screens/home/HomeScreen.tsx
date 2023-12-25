import MainNavigation from "@/navigation/MainNavigation";
import React from "react";
import { View, Text } from "react-native";

export const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <MainNavigation />
    </View>
  );
};