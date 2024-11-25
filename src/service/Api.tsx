import { Platform } from "react-native";


export const GEMINI_API_KEY = 'AIzaSyBXieOXW-0zCSONTW4mO2W2IKoox0cirZQ';

export const BASE_URL = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://localhost:3000';


// For Hosted
// export const BASE_URL = 'https://fcm-server.onrender.com';