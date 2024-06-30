import { StyleSheet, SafeAreaView, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { getNutritionDetails } from '../api/edamam.js';


export default function HomeScreen() {
    const [ingredients, setIngredients] = useState('');
    const [nutritionData, setNutritionData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchNutritionDetails = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getNutritionDetails(ingredients.split(','));
            setNutritionData(data);
            console.log(data.totalNutrients);
        } catch (err) {
            setError('Failed to fetch nutrition details.');
        } finally {
            setLoading(false);
        }
    };

  return (
    <SafeAreaView style={styles.pageContainer}>
        {/* Search Box */}
        <View style={styles.container}>
            <Text style={styles.label}>Enter ingredients separated by a comma (,):</Text>
            <TextInput
                style={styles.input}
                multiline
                value={ingredients}
                onChangeText={setIngredients}
            />
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={fetchNutritionDetails}
            >
                <Text>Get Nutrition Details</Text>
            </TouchableOpacity>
            {loading && <Text>Loading...</Text>}
            {error && <Text style={styles.error}>{error}</Text>}
            {nutritionData && (
                <View style={styles.results}>
                <Text style={styles.title}>Total Nutrition Details</Text>
                <Text>Calories: {nutritionData.calories}kcal</Text>
                <Text>Protein: {nutritionData.totalNutrients.PROCNT.quantity}g</Text>
                <Text>Carbohydrate: {nutritionData.totalNutrients.CHOCDF.quantity}g</Text>
                <Text>Fats: {nutritionData.totalNutrients.FAT.quantity}g</Text>
                <Text>Weight: {nutritionData.totalWeight}g</Text>
                {/* Display more nutrition data as needed */}
                </View>
            )}
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A1CEDC',
    borderRadius: 5,
    padding: 5,
  },
  title:{
    fontStyle: 'bold'
  },
  buttonText: {
    padding: 10
  },
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  error: {
    color: 'red',
  },
  results: {
    marginTop: 20,
  },
});
