import { ModalTitle } from "./AppText";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import AppIcon from "./Modals/AppIcon";

const LoadingScreen = () => {
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4); // cycles 0,1,2,3
    }, 200); // speed of animation
    return () => clearInterval(interval);
  }, []);

  const dots = ".".repeat(dotCount);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AppIcon size={250} />
      <View style={{ height: 30 }} />
      <ModalTitle>Configuring updates {dots}</ModalTitle>
    </View>
  );
};

export default LoadingScreen;
