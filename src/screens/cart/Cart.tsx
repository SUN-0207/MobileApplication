import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Loading from '../recipe/component/Loading';
import MasonryList from '@react-native-seoul/masonry-list'
import Checkbox from 'expo-checkbox';
import { ScrollView } from 'react-native';

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
  });


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

  const handleRemoveClick = async (id: string) => {
    try {
      const response = await fetch(`https://let-me-cook.onrender.com/ingredients/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers as needed
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete ingredient');
      }

      // If successful, fetch the updated list of ingredients
      getIngredientList();
    } catch (error) {
      console.error('Error deleting ingredient:', error);
    }
  };

  const handleClearAll = async () => {
    try {
      const response = await fetch(`https://let-me-cook.onrender.com/ingredients`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers as needed
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete ingredient');
      }

      // If successful, fetch the updated list of ingredients
      getIngredientList();
    } catch (error) {
      console.error('Error deleting ingredient:', error);
    }
  }
  
  return (
    <View style={{ flexDirection: 'column', marginVertical: 10 }}>
      <TouchableOpacity onPress={() => handleClearAll()}>
        <Text style={{ color: 'blue', marginLeft: 5 }}>ClearAll</Text>
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 10}}
        style={{paddingVertical:14, marginVertical: 6}}
      >
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
              <TouchableOpacity onPress={() => handleRemoveClick(ingredient._id)}>
                <Text style={{ color: 'red', marginLeft: 5 }}>X</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

export default Cart