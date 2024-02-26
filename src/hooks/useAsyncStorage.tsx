import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAsyncStorage = (key: string, initialValue: string) => {
  const [storedValue, setStoredValue] = useState('');

  useEffect(() => {
    const fetchStoredValue = async () => {
      const item = await AsyncStorage.getItem(key);
      if (item !== null) {
        setStoredValue(item);
      } else {
        setStoredValue(initialValue);
      }
    };
    fetchStoredValue();
  }, []);

  const setValue = async (value: string) => {
    try {
      await AsyncStorage.setItem(key, value);
      setStoredValue(value);
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export default useAsyncStorage;
