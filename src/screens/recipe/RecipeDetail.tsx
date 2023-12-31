import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { CachedImage } from './helper/CachedImage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon } from 'react-native-heroicons/outline';
import {  HeartIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from './component/Loading';
// import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Platform } from 'react-native';
import * as Linking from 'expo-linking';

const ios = Platform.OS=='ios';

interface RecipeDetailScreenProps {
    route: any; 
  }

  export default function RecipeDetailScreen(props: RecipeDetailScreenProps) {
    let item = props.route.params;
    const [isFavourite, setIsFavourite] = useState(false);
    const navigation = useNavigation();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        getMealData(item.idMeal);
    },[])

    const getMealData = async (id: string)=>{
        try{
          const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        //   console.log('got meal data: ',response.data);
          if(response && response.data){
            setMeal(response.data.meals[0]);
            setLoading(false);
          }
        }catch(err){
          console.log('error: ',err);
        }
    }

    const ingredientsIndexes = (meal: any)=>{
        if(!meal) return [];
        let indexes = [];
        for(let i = 1; i<=20; i++){
            if(meal['strIngredient'+i]){
                indexes.push(i);
            }
        }

        return indexes;
    }

    const getYoutubeVideoId = (url: string)=>{
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
          return match[1];
        }
        return null;
    }

    const handleOpenLink = (url: string)=>{
        Linking.openURL(url);
    }

  return (
    <View style = {{backgroundColor: 'white'}}>
        <StatusBar style={"light"} />
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 30}}
        >
        
        {/* recipe image */}
        <View>
            <CachedImage
                uri={item.strMealThumb}
                // sharedTransitionTag={item.strMeal} // this will only work on native image (now using Image from expo-image)
                style={{width: wp(100), height: hp(50),borderBottomLeftRadius: 40, borderBottomRightRadius: 40}}

            />
        </View>

        {/* back button */}
        {/* <Animated.View entering={FadeIn.delay(200).duration(1000)}> */}
            <TouchableOpacity onPress={()=> navigation.goBack()}>
                <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> setIsFavourite(!isFavourite)}>
                <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite? "red": "gray"} />
            </TouchableOpacity>
        {/* </Animated.View> */}

        {/* meal description */}
        {
            loading? (
                <Loading size="large"/>
            ):(
                <View>
                    {/* name and area */}
                    {/* <Animated.View entering={FadeInDown.duration(700).springify().damping(12)}> */}
                        <Text style={{fontSize: hp(3)}}>
                            {meal?.strMeal}
                        </Text>
                        <Text style={{fontSize: hp(2)}}>
                            {meal?.strArea}
                        </Text>
                    {/* </Animated.View> */}

                    {/* misc */}
                    {/* <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)}> */}
                        <View>
                            <View 
                                style={{height: hp(6.5), width: hp(6.5)}}
                            >
                                <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                            </View>
                            <View>
                                <Text style={{fontSize: hp(2)}}>
                                    35
                                </Text>
                                <Text style={{fontSize: hp(1.3)}}>
                                    Mins
                                </Text>
                            </View>
                        </View>
                        <View>
                            <View 
                                style={{height: hp(6.5), width: hp(6.5)}}
    
                            >
                                <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                            </View>
                            <View>
                                <Text style={{fontSize: hp(2)}}>
                                    03
                                </Text>
                                <Text style={{fontSize: hp(1.3)}}>
                                    Servings
                                </Text>
                            </View>
                        </View>
                        <View>
                            <View 
                                style={{height: hp(6.5), width: hp(6.5)}}
                            >
                                <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                            </View>
                            <View>
                                <Text style={{fontSize: hp(2)}}>
                                    103
                                </Text>
                                <Text style={{fontSize: hp(1.3)}}>
                                    Cal
                                </Text>
                            </View>
                        </View>
                        <View>
                            <View 
                                style={{height: hp(6.5), width: hp(6.5)}}
                            >
                                <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                            </View>
                            <View>
                                <Text style={{fontSize: hp(2)}}>
                                    
                                </Text>
                                <Text style={{fontSize: hp(1.3)}}>
                                    Easy
                                </Text>
                            </View>
                        </View>
                    {/* </Animated.View> */}

                    {/* ingredients */}
                    {/* <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)}> */}
                        <Text style={{fontSize: hp(2.5)}}>
                            Ingredients
                        </Text>
                        <View>
                            {
                                ingredientsIndexes(meal).map(i=>{
                                    return (
                                        <View key={i}>
                                            <View style={{height: hp(1.5), width: hp(1.5)}}/>
                                            <View>
                                                    <Text style={{fontSize: hp(1.7)}}>{meal['strMeasure'+i]}</Text>
                                                    <Text style={{fontSize: hp(1.7)}}>{meal['strIngredient'+i]}</Text>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    {/* </Animated.View> */}
                    {/* instructions */}
                    {/* <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)}> */}
                        <Text style={{fontSize: hp(2.5)}}>
                            Instructions
                        </Text>
                        <Text style={{fontSize: hp(1.6)}}>
                            {
                                meal?.strInstructions
                            }
                        </Text>
                    {/* </Animated.View> */}

                </View>
            )
        }
        </ScrollView>
    </View>
    
  )
}