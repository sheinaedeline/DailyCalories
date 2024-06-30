// API Call using axios
import axios from 'axios';

const APP_ID = 'afa615b8';
const APP_KEY = 'fa760c9320ce5c6e2eec0b6ab3f970a5';
const BASE_URL = 'https://api.edamam.com';

export const getNutritionDetails = async (ingredients) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/nutrition-details`, {ingr: ingredients}, {
        params: {
            app_id: APP_ID,
            app_key: APP_KEY,  
        },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching nutrition details:', error);
    throw error;
  }
};
