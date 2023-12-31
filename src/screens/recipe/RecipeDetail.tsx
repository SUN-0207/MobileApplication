import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { CachedImage } from "./helper/CachedImage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loading from "./component/Loading";
import * as Linking from "expo-linking";
import { ActivityIndicator } from "react-native";

interface RecipeDetailScreenProps {
  route: any;
}

const RecipeDetailScreen: React.FC<RecipeDetailScreenProps> = (props) => {
  const { route } = props;
  const item = route.params;
  const [isFavourite, setIsFavourite] = useState(false);
  const navigation = useNavigation();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);

  const getMealData = async (id: string) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      if (response && response.data) {
        setMeal(response.data.meals[0]);
        setLoading(false);
      }
    } catch (err) {
      console.log("error: ", err);
    }
  };

  const ingredientsIndexes = (meal: any) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  const renderIngredients = () => {
    if (!meal) return null;

    return ingredientsIndexes(meal).map((i) => (
      <View key={i} style={styles.ingredientContainer}>
        <View style={styles.bullet} />
        <View>
          <Text style={styles.ingredientText}>{meal["strMeasure" + i]}</Text>
          <Text style={styles.ingredientText}>{meal["strIngredient" + i]}</Text>
        </View>
      </View>
    ));
  };

  const renderInstructions = () => {
    if (!meal || !("strInstructions" in meal)) return null;

    const instructionsArray = (meal as any).strInstructions.split("\r\n");
    return instructionsArray.map((instruction: string, index: number) => (
      <View key={index} style={styles.instructionContainer}>
        <Text style={styles.instructionText}>{`${
          index + 1
        }. ${instruction}`}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Recipe Image */}
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Image
            source={{ uri: item.strMealThumb }}
            style={{
              width: wp(100),
              height: hp(50),
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
            }}
          />
        )}

        {/* Back Button and Favourite Icon */}
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.icon}
          >
            <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsFavourite(!isFavourite)}
            style={styles.icon}
          >
            <HeartIcon
              size={hp(3.5)}
              strokeWidth={4.5}
              color={isFavourite ? "red" : "gray"}
            />
          </TouchableOpacity>
        </View>

        {/* Meal Description */}
        {loading ? (
          <Loading size="large" />
        ) : (
          <View style={styles.mealDetailsContainer}>
            <Text style={styles.mealName}>{(meal as any)?.strMeal || ""}</Text>
            <Text style={styles.mealArea}>
              {meal && (meal as any)?.strArea ? (meal as any).strArea : ""}
            </Text>

            {/* Miscellaneous */}
            <View style={styles.miscContainer}>
              <View style={styles.miscItem}>
                <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                <View style={styles.miscTextContainer}>
                  <Text style={styles.miscValue}>35</Text>
                  <Text style={styles.miscLabel}>Mins</Text>
                </View>
              </View>
              <View style={styles.miscItem}>
                <UserIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                <View style={styles.miscTextContainer}>
                  <Text style={styles.miscValue}>03</Text>
                  <Text style={styles.miscLabel}>Servings</Text>
                </View>
              </View>
              {/* Add more miscellaneous items as needed */}
            </View>

            {/* Ingredients */}
            <Text style={styles.sectionHeading}>Ingredients</Text>
            <View style={styles.ingredientsContainer}>
              {renderIngredients()}
            </View>

            {/* Instructions */}
            <Text style={styles.sectionHeading}>Instructions</Text>
            <View style={styles.instructionsContainer}>
              {renderInstructions()}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {
    paddingBottom: 30,
  },
  recipeImage: {
    width: wp(100),
    height: hp(50),
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(5),
    marginTop: hp(2),
  },
  icon: {
    height: hp(3.5),
    width: hp(3.5),
  },
  mealDetailsContainer: {
    marginHorizontal: wp(5),
  },
  mealName: {
    fontSize: hp(3),
    fontWeight: "bold",
    marginBottom: hp(1),
  },
  mealArea: {
    fontSize: hp(2),
    color: "#555",
    marginBottom: hp(2),
  },
  miscContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: hp(2),
    paddingHorizontal: wp(21),
  },
  miscItem: {
    alignItems: "center",
    flexDirection: "row",
  },
  miscTextContainer: {
    alignItems: "center",
    marginTop: hp(1),
    marginLeft: hp(1),
  },
  miscValue: {
    fontSize: hp(2),
    fontWeight: "bold",
  },
  miscLabel: {
    fontSize: hp(1.3),
    color: "#555",
  },
  sectionHeading: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    marginVertical: hp(2),
  },
  ingredientsContainer: {
    marginLeft: wp(2),
  },
  ingredientContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(1),
  },
  bullet: {
    height: hp(1.5),
    width: hp(1.5),
    backgroundColor: "#fbbf24",
    borderRadius: hp(0.75),
    marginRight: wp(2),
  },
  ingredientText: {
    fontSize: hp(1.7),
  },
  instructionsContainer: {
    borderWidth: 1,
    borderColor: "#e2e2e2",
    borderRadius: 8,
    padding: hp(1.5),
    marginTop: hp(1.5),
  },
  instructionContainer: {
    marginBottom: hp(1),
  },
  instructionText: {
    fontSize: hp(1.6),
    color: "#555",
  },
});

export default RecipeDetailScreen;
