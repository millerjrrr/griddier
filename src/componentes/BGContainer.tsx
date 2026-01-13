// components/PinkGradientBackground.tsx
import React, { ReactNode } from "react";
import { Image, StyleSheet, View } from "react-native";
import colors from "@src/utils/colors";
const BackgroundOverlay = require("@assets/img/BGOverlay.png");

interface PinkGradientBackgroundProps {
  children: ReactNode;
}

export default function BGContainer({
  children,
}: PinkGradientBackgroundProps) {
  return (
    <View style={styles.container}>
      <Image
        source={BackgroundOverlay}
        style={{
          width: "100%",
          height: "100%",
          ...StyleSheet.absoluteFillObject,
          opacity: 0.75,
        }}
        resizeMode="cover"
      />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: colors.BG2,
  },
  content: {
    flex: 1,
  },
});
