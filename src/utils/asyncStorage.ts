import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";

const STORAGE_PATH =
  FileSystem.documentDirectory + "AsyncStorage.json";

const readFromFile = async (): Promise<
  Record<string, string>
> => {
  try {
    const content = await FileSystem.readAsStringAsync(
      STORAGE_PATH
    );
    return JSON.parse(content);
  } catch {
    return {}; // if file doesn't exist or can't be parsed
  }
};

const writeToFile = async (
  data: Record<string, string>
) => {
  try {
    await FileSystem.writeAsStringAsync(
      STORAGE_PATH,
      JSON.stringify(data, null, 2)
    );
    console.log("📁 Wrote to asyncStorage.json");
  } catch (error) {
    console.error(
      "❌ Failed to write to asyncStorage.json",
      error
    );
  }
};

export const saveToStorage = async (
  key: string,
  value: string
) => {
  if (__DEV__) {
    const current = await readFromFile();
    current[key] = value;
    await writeToFile(current);
  } else {
    await AsyncStorage.setItem(key, value);
  }
};

export const getFromStorage = async (
  key: string
): Promise<string | null> => {
  if (__DEV__) {
    const data = await readFromFile();
    return data[key] ?? null;
  } else {
    return await AsyncStorage.getItem(key);
  }
};

export const removeFromStorage = async (key: string) => {
  if (__DEV__) {
    const current = await readFromFile();
    delete current[key];
    await writeToFile(current);
  } else {
    await AsyncStorage.removeItem(key);
  }
};

export const clearStorage = async () => {
  if (__DEV__) {
    await writeToFile({});
  } else {
    await AsyncStorage.clear();
  }
};

export const fileBackedStorage = {
  getItem: async (key: string) => {
    return await getFromStorage(key);
  },
  setItem: async (key: string, value: string) => {
    await saveToStorage(key, value);
  },
  removeItem: async (key: string) => {
    await removeFromStorage(key);
  },
};
