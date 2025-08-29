import appShadow from "@src/utils/appShadow";
import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";
import React from "react";
import { Text, StyleSheet, View } from "react-native";
const { base } = screenDimensions();

interface SpotNameProps {
  name: string;
}

const SpotName: React.FC<SpotNameProps> = ({ name }) => {
  const formattedName =
    name.length < 25 ? name : name.replace(" (", "\n(");
  return (
    <View
      style={[
        styles.container,
        { ...appShadow(colors.CONTRAST, 10 * base) },
      ]}
    >
      <Text
        style={[
          styles.text,
          {
            fontSize:
              name.length < 25 * base
                ? 40 * base
                : 25 * base,
          },
        ]}
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
