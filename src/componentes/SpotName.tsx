import appShadow from "@src/utils/appShadow";
import colors from "@src/utils/colors";
import React from "react";
import { Text, StyleSheet, View } from "react-native";

interface SpotNameProps {
  name: string;
}

const SpotName: React.FC<SpotNameProps> = ({ name }) => {
  return (
    <View
      style={[
        styles.container,
        { ...appShadow(colors.CONTRAST, 10) },
      ]}
    >
      <Text
        style={[
          styles.text,
          { fontSize: name.length < 25 ? 30 : 20 },
        ]}
      >
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.PRIMARY,
    marginBottom: 40,
  },
  text: {
    color: colors.CONTRAST,
    fontWeight: "bold",
    fontSize: 30,
  },
});

export default SpotName;
