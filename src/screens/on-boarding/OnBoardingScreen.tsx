import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export const OnBoardingScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={() => navigation.navigate('Home' as never)}
        onSkip={() => navigation.navigate('Home' as never)}
        pages={[
          {
            backgroundColor: '#fff',
            image: (
              <View style={styles.lottie}>
                <Lottie source={require('@/assets/animations/cooking.json')} autoPlay loop />
              </View>
            ),
            title: 'Ingredient Scanner',
            subtitle: 'Scan ingredients and discover delicious dishes instantly.',
          },
          {
            backgroundColor: '#fff',
            image: (
              <View style={styles.lottie}>
                <Lottie source={require('@/assets/animations/cooking.json')} autoPlay loop />
              </View>
            ),
            title: 'Virtual Chef',
            subtitle: 'Our personal chef: just scan ingredients and let us suggest dishes.',
          },
          {
            backgroundColor: '#fff',
            image: (
              <View style={styles.lottie}>
                <Lottie source={require('@/assets/animations/cooking.json')} autoPlay loop />
              </View>
            ),
            title: 'Culinary Magic',
            subtitle: 'Turn your ingredients into culinary magic with our app\'s scanning feature.',
          },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  lottie: {
    width: width*0.9,
    height: height*0.4,
  }
});