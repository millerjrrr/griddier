import React, { useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import { ModalTitle } from "./AppText";
import AppIcon from "./Modals/AppIcon";
import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";

const { base } = screenDimensions();

const LoadingScreen = () => {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000, // 5 seconds
      useNativeDriver: false, // width animation
    }).start();
  }, []);

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AppIcon size={250 * base} />

      <View style={{ height: 30 * base }} />

      <View
        style={{
          width: 220 * base,
          height: 4 * base,
          backgroundColor: colors.C1 + "33",
          borderRadius: 2 * base,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={{
            height: "100%",
            width: widthInterpolated,
            backgroundColor: colors.C1,
          }}
        />
      </View>
    </View>
  );
};

export default LoadingScreen;
