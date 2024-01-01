import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import Animated, { FadeInDown } from 'react-native-reanimated';


interface CategoriesProps {
  categories: {
    strCategory: string;
    strCategoryThumb: string;
  }[];
  activeCategory: string;
  handleChangeCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ categories, activeCategory, handleChangeCategory }) => {
  return (
    // <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((cat, index) => {
          let isActive = cat.strCategory === activeCategory;
          let activeButtonClass = isActive ? ' bg-amber-400' : ' bg-black/10';
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(cat.strCategory)}
              style={{ flex: 1, alignItems: 'center', marginHorizontal: 4 }}
            >
              <View style={{ borderRadius: 999, padding: 6, backgroundColor: activeButtonClass }}>
                <Image
                  source={{ uri: cat.strCategoryThumb }}
                  style={{ width: hp(6), height: hp(6), borderRadius: hp(6) / 2 }}
                />
              </View>
              <Text style={{ color: 'rgba(0,0,0,0.6)', fontSize: hp(1.6), marginTop: 4 }}>
                {cat.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    // </Animated.View>
  );
};

export default Categories;