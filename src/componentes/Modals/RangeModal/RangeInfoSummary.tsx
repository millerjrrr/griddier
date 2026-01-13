import { DataEntry, StrictDateString } from "@src/types";
import formatTime from "@src/utils/formatTime";
import prettyDate from "@src/utils/prettyDate";
import screenDimensions from "@src/utils/screenDimensions";
import { View } from "react-native";
import { InfoText } from "../../AppText";
const { base } = screenDimensions();

const RangeInfoSummary: React.FC<{
  dataEntry: DataEntry;
}> = ({ dataEntry }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10 * base,
        justifyContent: "center",
      }}
    >
      <InfoText>Drilled: {dataEntry.drilled}</InfoText>
      <InfoText>
        Time Drilling: {formatTime(dataEntry.timeDrilling)}
      </InfoText>
      <InfoText>
        {dataEntry.lastStudied === ""
          ? ""
          : `Last Studied: ${prettyDate(
              dataEntry.lastStudied
            )}`}
      </InfoText>
      <InfoText>
        {dataEntry.lastStudied === ""
          ? ""
          : `Due: ${prettyDate(
              dataEntry.dueDate as StrictDateString
            )}`}
      </InfoText>
    </View>
  );
};

export default RangeInfoSummary;
