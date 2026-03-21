import React from "react";
import { View, Button } from "react-native";

import { LocalPokerRangeDataSource } from "@/data/data-sources/local/LocalPokerRangeDataSource";
import { PokerRangeRepositoryImpl } from "@/data/repositories/PokerRangeRepositoryImpl";
import { GetAllRangesUseCase } from "@/domain/use-cases/GetAllRangesUseCase";

export default function RangesList() {
  const handlePress = async () => {
    // 🔌 manual wiring (totally fine for now)
    const dataSource = new LocalPokerRangeDataSource();
    const repository = new PokerRangeRepositoryImpl(
      dataSource,
    );
    const useCase = new GetAllRangesUseCase(repository);

    const ranges = await useCase.execute();

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
