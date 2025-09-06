import { useState } from "react";
import { View, StyleSheet } from "react-native";
import LevelLine from "./LevelLine";
import appShadow from "@src/utils/appShadow";
import returnFrequencyArray from "@src/utils/returnFrequencyArray";
import colors from "@src/utils/colors";
import { ModalText } from "@src/componentes/AppText";

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
    (h) => (h * histHeight) / maxHeight
  );
  const { CONTRAST, SECONDARY } = colors;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.levelHistogram,
          {
            backgroundColor: SECONDARY,
            ...appShadow(CONTRAST),
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
      <ModalText
        style={{
          fontSize: 50,
          fontWeight: "bold",
          padding: 10,
        }}
      >
        {heights[selected - 1]}
      </ModalText>
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
    padding: 10,
    borderRadius: 10,
  },
});

export default LevelHistogram;
