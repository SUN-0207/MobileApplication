import { ScrollView, StatusBar, theme } from "native-base";
import React, {useState, useEffect} from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import {BellIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import axios from 'axios';
import Categories from "./component/Categories";
import Dishes from "./component/Dishes";
// import Recipes from "./recipes";

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
}
interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface RecipeListScreenProps {
  route: any;
}

const RecipeListScreen: React.FC<RecipeListScreenProps> = (props) => {
  const {route} = props;
  const item = route.params;
  const [activeCategory, setActiveCategory] = useState<string>('Beef');
  const [categories, setCategories] = useState<Category[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [activeSearchContent, setActiveSearchContent] = useState<string>();

  useEffect(() => {
    getCategories();  
    if(item.scanResult){
      handleChangeCategory(item.scanResult)
    } else getRecipes();
  },[]);

  const handleChangeCategory = (category: string) => {
    setActiveCategory(category);
    getRecipes(category, activeSearchContent);
    setMeals([]);
  };

  const handleSearch = (searchContent: string) => {
    setActiveSearchContent(searchContent);
    getRecipes(activeCategory, activeSearchContent);
  }

  const getCategories = async () => {
    try {
      const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.log('error: ', err);
    }
  };
  const getRecipes = async (category = 'Beef', searchContent = '') => {
    try {
      const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      if (response && response.data) {
        if(searchContent) {
            const filteredResponse = response.data.meals.filter(
              (meal:Meal) => meal.strMeal.toLowerCase().includes(searchContent.toLowerCase())
            )
            setMeals(filteredResponse)
        }
        else setMeals(response.data.meals);
      }
    } catch (err) {
      console.log('error: ', err);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center',backgroundColor: 'white' }}>
      <StatusBar barStyle={'dark-content'}/>

      {/* search bar */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 10}}
        style={{paddingVertical:14, marginVertical: 6}}
      >
        <View style={styles.searchBar}>
          <TextInput
            placeholder='Tim cong thuc'
            placeholderTextColor={'gray'}
            style={{fontSize: hp(1.7), flex: 1, marginBottom: 1, paddingLeft: 3, flexDirection: 'row', alignItems: 'center'}}
            onChangeText={(text) => handleSearch(text)}
          />
          <View style={{backgroundColor:'white', padding: 12, borderRadius:710}}>
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>

        <View>
          { categories.length>0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} /> }
        </View>

        <View>
          <Dishes meals={meals} categories={categories} />
        </View>

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  searchBar: {
    marginLeft: 4,
    marginRight: 4,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 6,
  },
});
export default RecipeListScreen