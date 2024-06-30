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
        } catch (err) {
            setError('Failed to fetch nutrition details.');
        } finally {
            setLoading(false);
        }
    };

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            <Text style={styles.label}>Enter ingredients separated by a comma (,):</Text>
            <TextInput
                style={styles.input}
                multiline
                value={ingredients}
                onChangeText={setIngredients}
            />
            <TouchableOpacity
                onPress={fetchNutritionDetails}
            >
                <Text>Get Nutrition Details</Text>
            </TouchableOpacity>
            {loading && <Text>Loading...</Text>}
            {error && <Text style={styles.error}>{error}</Text>}
            {nutritionData && (
                <View style={styles.results}>
                <Text>Calories: {nutritionData.calories}</Text>
                <Text>Weight: {nutritionData.totalWeight}</Text>
                {/* Display more nutrition data as needed */}
                </View>
            )}
        </View>
        {/* Search Box */}
        {/* <View style={styles.inputContainer}>
            <TextInput
                placeholder='Search Food'
                editable
                multiline
                numberOfLines={4}
                maxLength={40}
                value={ingredients}
                onChangeText={text => setIngredients(text)}
                style={styles.input}
            />
        </View>
        <TouchableOpacity
            style={styles.buttonContainer}
            onPress={fetchNutritionDetails}
        >
            <Text style={styles.buttonText}>Analyze</Text>
        </TouchableOpacity> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   inputContainer: {
//     width: '80%',
//     backgroundColor: 'white',
//     borderRadius: 10,
//   },
//   input: {
//     padding: 10
//   },
//   buttonContainer: {
//     width: '50%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 20,
//     backgroundColor: '#A1CEDC',
//     borderRadius: 10,
//   },
//   buttonText: {
//     padding: 10
//   },
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
