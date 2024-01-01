import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list'
// import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './Loading';
import { CachedImage } from '../helper/CachedImage';
import { useNavigation } from '@react-navigation/native';

interface DishesProps {
  categories: any[]; // Adjust the type as needed
  meals: any[]; // Adjust the type as needed
}

const Dishes: React.FC<DishesProps> = ({ categories, meals }) => {
  const navigation = useNavigation();

  return (
    <View style={{ marginHorizontal: 4, marginVertical: 4 }}>
      <Text style={{ fontSize: hp(3), fontWeight: 'bold', color: 'rgba(0,0,0,0.6)' }}>Recipes</Text>
      <View>
        {categories.length === 0 || meals.length === 0 ? (
          <Loading size="large" style={{ marginTop: 20 }} />
        ) : (
          <MasonryList
            data={meals}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => <RecipeCard item={item} index={i} navigation={navigation} />}
            onEndReachedThreshold={0.1}
          />
        )}
      </View>
    </View>
  );
};

interface RecipeCardProps {
  item: any; // Adjust the type as needed
  index: number;
  navigation: any; // Adjust the type as needed
}

const RecipeCard: React.FC<RecipeCardProps> = ({ item, index, navigation }) => {
  const isEven = index % 2 === 0;

  return (
    // <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
      <Pressable
        style={{ width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
        onPress={() => navigation.navigate('RecipeDetail', { ...item })}
      >
        <CachedImage
          uri={item.strMealThumb}
          style={{ width: '100%', height: index % 3 === 0 ? hp(25) : hp(35), borderRadius: 35 }}
          // className="bg-black/5"
        />
        <Text style={{ fontSize: hp(1.5), fontWeight: 'bold', color: 'rgba(0,0,0,0.6)', marginLeft: 2 }}>
          {item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal}
        </Text>
      </Pressable>
    // </Animated.View>
  );
};

export default Dishes;