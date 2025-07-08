import { DataEntry } from "@src/types";
import appShadow from "@src/utils/appShadow";
import { Text, View } from "react-native";

interface RangeCardProps {
  dataEntry: DataEntry;
}

const RangeCard: React.FC<RangeCardProps> = ({
  dataEntry,
}) => {
  return (
    <View
      style={{
        padding: 15,
        width: "100%",
        ...appShadow("black"),
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <Text>{dataEntry.gridName}</Text>
    </View>
  );
};

export default RangeCard;
