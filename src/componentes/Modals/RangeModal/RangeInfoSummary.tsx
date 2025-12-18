import { View } from "react-native";
import { InfoText, InstructionText } from "../../AppText";
import screenDimensions from "@src/utils/screenDimensions";
import { DataEntry } from "@src/types";
import formatTime from "@src/utils/formatTime";
import prettyDate from "@src/utils/prettyDate";
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
          : `Due: ${prettyDate(dataEntry.dueDate)}`}
      </InfoText>
    </View>
  );
};

export default RangeInfoSummary;
