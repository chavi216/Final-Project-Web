import { authApi } from './authApi';
import { clientApi } from './clientApi';
import { nutritionistApi } from './nutritionistApi';
// ייבוא הקובץ של המאמן (בהנחה שקיים):
import { trainerApi } from './trainerApi'; 

export const apiService = {
  auth: authApi,
  client: clientApi,
  nutritionist: nutritionistApi,
  trainer: trainerApi, // הוספת המאמן לכאן
};