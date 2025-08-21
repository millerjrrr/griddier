import { HandsObject } from "@src/types";
import calculateFrequencies from "@src/utils/calculateFrequencies";
import colors from "@src/utils/colors";
import { Dimensions, Text, View } from "react-native";

interface FreqBarProps {
  handsObject: HandsObject;
}

const { width: vw } = Dimensions.get("window");

const SubBar: React.FC<{
  freq: number;
  combos: number;
  color: string;
}> = ({ freq, combos, color }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          width: freq * vw * 0.85,
          backgroundColor: color,
          borderRadius: 10,
          height: 20,
          // alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
        }}
      >
        {freq > 0 && (
          <Text style={{ fontSize: 18 }}>
            {Math.round(freq * 100)}
          </Text>
        )}
        <Text style={{ fontSize: freq > 0.1 ? 10 : 1 }}>
          %
        </Text>

        {/* {freq > 0 && (
          <Text style={{ fontSize: 18 }}>{`${Math.round(
            combos
          )}`}</Text>
        )} */}
      </View>
    </View>
  );
};

const FrequencyBar: React.FC<FreqBarProps> = ({
  handsObject,
}) => {
  const { ALLIN, RAISE, CALL, FOLD } = colors;

  const {
    allinPercentage,
    raisePercentage,
    callPercentage,
    foldPercentage,
    allinCombos,
    raiseCombos,
    callCombos,
    foldCombos,
  } = calculateFrequencies(handsObject);

  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        paddingVertical: 10,
      }}
    >
      <SubBar
        freq={allinPercentage}
        combos={allinCombos}
        color={ALLIN}
      />
      <SubBar
        freq={raisePercentage}
        combos={raiseCombos}
        color={RAISE}
      />
      <SubBar
        freq={callPercentage}
        combos={callCombos}
        color={CALL}
      />
      <SubBar
        freq={foldPercentage}
        combos={foldCombos}
        color={FOLD}
      />
    </View>
  );
};

export default FrequencyBar;
