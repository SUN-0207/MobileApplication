import React, { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import StarRating from "react-native-star-rating";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

const Favorite = () => {
  const navigation = useNavigation();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get(
          "https://themealdb.com/api/json/v1/1/filter.php?c=Beef"
        );
        if (response && response.data) {
          setMeals(response.data.meals);
        }
      } catch (err) {
        console.log("error: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const renderRecipeItem = ({ item }: { item: Meal }) => (
    <TouchableOpacity
      onPress={() => {
        // Navigate to the recipe details screen with the selected meal
        navigation.navigate("RecipeDetailScreen", { idMeal: item.idMeal });
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: 120,
            height: 120,
            marginRight: 10,
            marginLeft: 10,
            marginTop: 10,
            marginBottom: 10,
            borderRadius: 15,
          }}
        />
        <View
          style={{ flex: 1, flexWrap: "wrap", marginLeft: 10, marginTop: 10 }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 12,
              alignSelf: "flex-start",
            }}
          >
            {item.strMeal}
          </Text>
          <View
            style={{ flexDirection: "row", alignItems: "center", marginTop: 3 }}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <Icon key={index} name="star" size={20} color="gold" />
            ))}
            <Text style={{}}> {4.9} </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={meals}
          renderItem={renderRecipeItem}
          keyExtractor={(item) => item.idMeal}
        />
      )}
    </View>
  );
};

export default Favorite;
