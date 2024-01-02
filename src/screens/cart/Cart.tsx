import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Loading from '../recipe/component/Loading';
import MasonryList from '@react-native-seoul/masonry-list'
import Checkbox from 'expo-checkbox';

interface Ingredients {
  _id: string;
  name: string;
  description: number;
}

const Cart = () => {

  const[ingredients, setIngredients] = useState<Ingredients[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  
  useEffect(() => {
    getIngredientList();
  }, []);


  const getIngredientList = async () => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://let-me-cook.onrender.com/ingredients'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Loi roi');
        }
        const result = await response.json();
        setIngredients(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  };
  
  const handleCheckboxChange = (id: string) => {
    const isSelected = selectedIngredients.includes(id);
    console.log(id)
    if (isSelected) {
      setSelectedIngredients(selectedIngredients.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIngredients([...selectedIngredients, id]);
    }
  };

  const handleRemoveClick = (id: string) => {
    fetch('https://let-me-cook.onrender.com/ingredients', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ingredientData),
      })
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={{ flexDirection: 'column', marginVertical: 10 }}>
      
      {ingredients.map((ingredient) => (
        <View key={ingredient._id} style={{ flexDirection: 'row', marginBottom: 10 }}>
          <View style={{ flex: 1 }}>
            <Text>{ingredient.name}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>{ingredient.description}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Checkbox
              value={selectedIngredients.includes(ingredient._id)}
              onValueChange={() => handleCheckboxChange(ingredient._id)}
            />
            <TouchableOpacity onPress={() => handleRemoveClick(ingredient.id)}>
              <Text style={{ color: 'red', marginLeft: 5 }}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  )
}

export default Cart