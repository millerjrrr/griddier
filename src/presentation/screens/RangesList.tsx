import React from "react";
import { View, Button } from "react-native";

import { getAllRangesUseCase } from "@/container";

export default function RangesList() {
  const handlePress = async () => {
    const ranges = await getAllRangesUseCase.execute();
    console.log("RANGES:", ranges[0]);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Load Ranges" onPress={handlePress} />
    </View>
  );
}
