import appShadow from "@src/utils/appShadow";
import React from "react";
import { Text, StyleSheet, View } from "react-native";

interface SpotNameProps {
  name: string;
}

const SpotName: React.FC<SpotNameProps> = ({ name }) => {
  return (
    <View
      style={[styles.container, { ...appShadow("black") }]}
    >
      <Text style={styles.text}>{name}</Text>;
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
    marginBottom: 30,
  },
  text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 30,
  },
});

export default SpotName;
