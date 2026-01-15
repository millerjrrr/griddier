import {
  selectTrainerState,
  toggleShowCombos,
} from "@src/store/trainer";
import { HandsObject } from "@src/types";
import calculateFrequencies from "@src/utils/calculateFrequencies";
import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppPressable } from "./AppPressables";
import {
  FrequencyBarCombosText,
  FrequencyBarText,
} from "./AppText";

interface FreqBarProps {
  handsObject: HandsObject;
}

const { width: vw, base } = screenDimensions();

const SubBar: React.FC<{
  freq: number;
  combos: number;
  color: string;
}> = ({ freq, combos, color }) => {
  const { showCombos } = useSelector(selectTrainerState);
  const dispatch = useDispatch();
  const toggleCombos = () => dispatch(toggleShowCombos());

  return (
    freq > 0 && (
      <AppPressable
        style={{ alignItems: "center" }}
        onPress={toggleCombos}
      >
        <View
          style={{
            width: freq > 0 ? 0.25 * vw * 0.85 : 0,
            backgroundColor: color,
            borderRadius: 10 * base,
            // alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <FrequencyBarText>
            {showCombos ? combos : Math.round(freq * 100)}
          </FrequencyBarText>
          {!showCombos && (
            <FrequencyBarCombosText
              style={{ fontSize: 10 * base }}
            >
              %
            </FrequencyBarCombosText>
          )}
        </View>
      </AppPressable>
    )
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
