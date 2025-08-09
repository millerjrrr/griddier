import appShadow from "@src/utils/appShadow";
import { Text, View } from "react-native";
import * as FileSystem from "expo-file-system";
import colors from "@src/utils/colors";
import { AppTouchable } from "./AppPressables";

const ResetDataCard = () => {
  const onPress = async () => {
    const path =
      FileSystem.documentDirectory + "AsyncStorage.json";
    try {
      await FileSystem.writeAsStringAsync(path, "{}");
      console.log(
        "🧹 Cleared file-backed AsyncStorage.json"
      );
    } catch (err) {
      console.error(
        "❌ Failed to clear file-backed AsyncStorage:",
        err
      );
    }
  };

  return (
    <AppTouchable
      style={{
        marginTop: 30,
        padding: 5,
        width: "100%",
        ...appShadow("black"),
        borderRadius: 10,
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
          padding: 5,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          ⚠️ Reset User Data
        </Text>
      </View>
    </AppTouchable>
  );
};

export default ResetDataCard;
