import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import LevelLine from "./LevelLine";
import {
  appShadow,
  typography,
} from "@/presentation/theme";
import returnFrequencyArray from "@/utils/returnFrequencyArray";
import colors from "@/presentation/theme/colors";
import getAppDimensions from "@/presentation/theme/appDimensions";
const { base, textBase } = getAppDimensions();

interface Props {
  levelsArray: number[];
  histHeight: number;
}

const LevelHistogram: React.FC<Props> = ({
  levelsArray,
  histHeight,
}) => {
  const [selected, setSelected] = useState(1);

  const heights = returnFrequencyArray(levelsArray);
  let maxHeight = Math.max(...heights);

  const normalizedHeights = heights.map(
    (h) => (h * histHeight) / maxHeight,
  );
  const { C2, BG4 } = colors;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.levelHistogram,
          {
            backgroundColor: BG4,
            borderColor: C2,
            ...appShadow(),
          },
        ]}
      >
        {normalizedHeights.map((_, index) => (
          <LevelLine
            key={index}
            level={index + 1}
            height={normalizedHeights[index]}
            touched={index + 1 === selected}
            onPress={() => {
              setSelected(index + 1);
            }}
          />
        ))}
      </View>
      <Text
        style={[
          typography.modalText,
          {
            fontSize: 50 * textBase,
            fontWeight: "bold",
            padding: 10 * base,
          },
        ]}
      >
        {heights[selected - 1]}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  levelHistogram: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 10 * base,
    borderRadius: 10 * base,
    borderWidth: 1 * base,
  },
});

export default LevelHistogram;
