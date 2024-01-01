import React from 'react';
import { View, Text, ActivityIndicator, ActivityIndicatorProps } from 'react-native';

interface LoadingProps extends ActivityIndicatorProps {
  // Additional props can be added as needed
}

const Loading: React.FC<LoadingProps> = (props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator {...props} />
    </View>
  );
};

export default Loading;