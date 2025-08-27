import { Alert, Platform } from "react-native";

export const showAlert = (
  title: string,
  message: string
) => {
  if (Platform.OS === "web") {
    window.alert(`${title}\n\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};

export const confirmOverwrite =
  async (): Promise<boolean> => {
    if (Platform.OS === "web") {
      return window.confirm(
        "This will overwrite all your current progress. Are you sure?"
      );
    }
    return new Promise((resolve) => {
      Alert.alert(
        "Warning",
        "This will overwrite all your current progress. Are you sure?",
        [
          {
            text: "Cancel",
            onPress: () => resolve(false),
            style: "cancel",
          },
          { text: "Yes", onPress: () => resolve(true) },
        ]
      );
    });
  };
