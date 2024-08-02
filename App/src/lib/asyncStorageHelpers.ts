import AsyncStorage from '@react-native-async-storage/async-storage';

export const setStorage = async <T>(key: string, value: T): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {}
};

export const getStorage = async <T>(key: string): Promise<T | null> => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data) {
      return JSON.parse(data) as T;
    } else {
      // throw new Error(`${key} is not in storage`)
      console.log(`${key} is not in storage`);
      return null;
    }
  } catch (error) {
    console.error(`Error getting ${key}: `, error);
    return null;
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {}
};
