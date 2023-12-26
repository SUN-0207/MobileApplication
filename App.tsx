import { ApplicationNavigation } from '@/navigation/ApplicationNavigation';
import { NativeBaseProvider, Text, Box } from "native-base";
import React from 'react';

export default function App() {
  return (
    <NativeBaseProvider>
      <ApplicationNavigation />
    </NativeBaseProvider>
  );
}