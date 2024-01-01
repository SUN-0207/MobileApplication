import React from 'react';
import { Image, ImageProps } from 'expo-image';

interface CachedImageProps extends ImageProps {
  uri: string;
}

export const CachedImage: React.FC<CachedImageProps> = ({ uri, ...props }) => {
  return <Image source={{ uri }} {...props} />;
};