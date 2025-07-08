import { DataEntry } from "@src/types";
import appShadow from "@src/utils/appShadow";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LevelStars from "./LevelStars";
import Clock from "./Clock";
import DateWithIcon from "./DateWithIcon";
const lockIcon = require("@assets/img/lock.png");
import * as FileSystem from "expo-file-system";
import Toast from "react-native-toast-message";

interface RangeCardProps {
  dataEntry: DataEntry;
  selectFunction: () => void;
}

const RangeCard: React.FC<RangeCardProps> = ({
  dataEntry,
  selectFunction,
}) => {
  const onPress = dataEntry.locked
    ? () =>
        Toast.show({
          type: "success",
          text1: "Locked",
          text2: "Complete previous levels!",
          visibilityTime: 2000,
          text1Style: { fontSize: 20 },
          text2Style: { fontSize: 17 },
        })
    : selectFunction;

  // const onPress = async () => {
  //   const path =
  //     FileSystem.documentDirectory + "AsyncStorage.json";
  //   try {
  //     await FileSystem.writeAsStringAsync(path, "{}");
  //     console.log(
  //       "🧹 Cleared file-backed AsyncStorage.json"
  //     );
  //   } catch (err) {
  //     console.error(
  //       "❌ Failed to clear file-backed AsyncStorage:",
  //       err
  //     );
  //   }
  // };

  return (
    <TouchableOpacity
      style={{
        marginVertical: 8,
        padding: 5,
        width: "100%",
        ...appShadow("black"),
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
      onPress={onPress}
    >
      {dataEntry.locked ? (
        <Image
          source={lockIcon}
          resizeMode="contain"
          style={{
            height: 50,
            aspectRatio: 1,
            margin: 10,
          }}
        />
      ) : (
        <>
          <View
            style={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              padding: 5,
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold" }}
            >
              {dataEntry.gridName}
            </Text>
            <DateWithIcon date={dataEntry.dueDate} />
          </View>
          <View
            style={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              padding: 5,
            }}
          >
            <LevelStars stars={dataEntry.level} />
            <Clock record={dataEntry.recordTime} />
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

export default RangeCard;
