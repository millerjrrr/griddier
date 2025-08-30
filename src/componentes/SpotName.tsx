import appShadow from "@src/utils/appShadow";
import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";
import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  LayoutChangeEvent,
} from "react-native";
const { base } = screenDimensions();

interface SpotNameProps {
  name: string;
}

const SpotName: React.FC<SpotNameProps> = ({ name }) => {
  const [parentWidth, setParentWidth] = useState(0);
  const [tooLong, setTooLong] = useState(false);

  // If tooLong is true, insert \n at your chosen character
  const formattedName = tooLong
    ? name.replace(" (", "\n(")
    : name;

  return (
    <View
      style={[
        styles.container,
        { ...appShadow(colors.CONTRAST, 10 * base) },
      ]}
      onLayout={(e: LayoutChangeEvent) => {
        setParentWidth(e.nativeEvent.layout.width);
      }}
    >
      <Text
        style={[
          styles.text,
          {
            fontSize: 35 * base,
          },
        ]}
        onLayout={(e: LayoutChangeEvent) => {
          const textWidth = e.nativeEvent.layout.width;
          if (
            parentWidth > 0 &&
            textWidth > parentWidth &&
            !tooLong
          ) {
            setTooLong(true); // triggers a re-render with formatted text
          }
        }}
      >
        {formattedName}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10 * base,
    padding: 10 * base,
    backgroundColor: colors.PRIMARY,
    marginBottom: 40 * base,
  },
  text: {
    color: colors.CONTRAST,
    fontWeight: "bold",
    fontSize: 30 * base,
    textAlign: "center",
  },
});

export default SpotName;
