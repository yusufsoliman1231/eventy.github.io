import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {navigate} from '../utils/navigationHelper';
import {storage} from '../utils/storage';
import * as Localization from 'expo-localization';

export const http = axios.create({
  baseURL: '',
});

const languageCode = Localization.locale.split('-')[0]; // to detect the user default lang
let language: string | undefined = 'en'; // to get the lang from the localstorage

http.interceptors.request.use(
  async config => {
    language = storage.getString('local');
    const token = await AsyncStorage.getItem('token');
    const subdomain = await AsyncStorage.getItem('subdomain');
    config.headers['Authorization'] = `Bearer ${token ? token : ''}`;
    config.baseURL = `https://${subdomain}.eventy.cloud/${
      language ? language : languageCode
    }/api/v1`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  response => {
    // Your response logic here
    return response;
  },
  error => {
    // Handle response errors globally
    if (error.response && error.response.status === 401) {
      // Clear token from local storage
      AsyncStorage.removeItem('token');
      setTimeout(() => {
        location.reload();
      }, 10000);
      navigate('SignIn' as never);
    }
    return Promise.reject(error);
  },
);
