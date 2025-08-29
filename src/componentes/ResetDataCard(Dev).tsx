import appShadow from "@src/utils/appShadow";
import { Platform, Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import colors from "@src/utils/colors";
import { AppTouchable } from "./AppPressables";
import screenDimensions from "@src/utils/screenDimensions";

const { base } = screenDimensions();

const ResetDataCard = () => {
  const onPress = async () => {
    if (Platform.OS === "web") {
      try {
        localStorage.clear();
        window.location.reload();
      } catch (err) {
        console.error(
          "❌ Failed to clear localStorage:",
          err
        );
      }
    } else {
      const path =
        FileSystem.documentDirectory + "AsyncStorage.json";
      try {
        await FileSystem.writeAsStringAsync(path, "{}");
        console.log(
          "🧹 Cleared file-backed AsyncStorage.json (native)"
        );
      } catch (err) {
        console.error(
          "❌ Failed to clear file-backed AsyncStorage:",
          err
        );
      }
    }
  };

  return (
    <AppTouchable
      style={{
        margin: 5 * base,
        marginTop: 30 * base,
        padding: 5 * base,
        width: "100%",
        ...appShadow("black"),
        borderRadius: 10 * base,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.TERTIARY,
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          padding: 5 * base,
        }}
      >
        <Text
          style={{
            fontSize: 20 * base,
            fontWeight: "bold",
          }}
        >
          ⚠️ Reset User Data
        </Text>
      </View>
    </AppTouchable>
  );
};

export default ResetDataCard;
