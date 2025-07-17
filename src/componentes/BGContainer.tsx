// components/PinkGradientBackground.tsx
import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "@src/utils/colors";

interface PinkGradientBackgroundProps {
  children: ReactNode;
}

export default function BGContainer({
  children,
}: PinkGradientBackgroundProps) {
  const { PRIMARY, SECONDARY, TERTIARY } = colors;
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[PRIMARY, SECONDARY, TERTIARY]}
        locations={[0, 0.8, 1]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1, y: 1 }}
      />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  content: {
    flex: 1,
  },
});
