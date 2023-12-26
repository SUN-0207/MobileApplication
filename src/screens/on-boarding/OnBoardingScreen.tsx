import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export const OnBoardingScreen = () => {
  const navigation = useNavigation();

  const doneButton = ({ ...props }) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text style={styles.doneButtonText}>Get Started</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <Onboarding
        onDone={() => navigation.navigate('Home' as never)}
        onSkip={() => navigation.navigate('Home' as never)}
        DoneButtonComponent={doneButton}
        pages={[
          {
            backgroundColor: '#8A88FF',
            image: (
              <View style={styles.lottie}>
                <Lottie source={require('@/assets/animations/ingredient.json')} autoPlay loop />
              </View>
            ),
            title: 'Ingredient Scanner',
            subtitle: 'Scan ingredients and discover delicious dishes instantly.',
          },
          {
            backgroundColor: '#8A88FF',
            image: (
              <View style={styles.lottie}>
                <Lottie source={require('@/assets/animations/chef.json')} autoPlay loop />
              </View>
            ),
            title: 'Virtual Chef',
            subtitle: 'Our personal chef just scan ingredients and let us suggest dishes.',
          },
          {
            backgroundColor: '#8A88FF',
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
    backgroundColor: "#3935FF",
  },
  lottie: {
    width: width*0.9,
    height: height*0.4,
  },
  doneButton: {
    padding: 12,
    borderRadius: 10,
    marginRight: 10
  },
  doneButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  }
});