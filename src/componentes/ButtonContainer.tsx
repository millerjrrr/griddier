import React from "react";
import { View, StyleSheet } from "react-native";
import ActionButton from "./ActionButton";
import { ActionName, GridName } from "../types";
import { GridData } from "@assets/data/GridData";

interface ButtonsRowProps {
  gridName: GridName;
}

const ButtonContainer: React.FC<ButtonsRowProps> = ({
  gridName,
}) => {
  const handsEntries = Object.values(
    GridData[gridName].hands
  );

  const shouldShow = (array: number[]) =>
    array.some((val) => val > 0);

  const buttonsConfig: {
    key: string;
    name: ActionName;
    show: boolean;
  }[] = [
    {
      key: "AllIn",
      name: "AllIn",
      show: shouldShow(handsEntries.map((h) => h.allin)),
    },
    {
      key: "Raise",
      name: "Raise",
      show: shouldShow(handsEntries.map((h) => h.raise)),
    },
    {
      key: "Call",
      name: "Call",
      show: shouldShow(handsEntries.map((h) => h.call)),
    },
    { key: "Fold", name: "Fold", show: true },
  ];

  const buttonsToRender = buttonsConfig.filter(
    (btn) => btn.show
  );
  const maxWidth = buttonsToRender.length === 4 ? 75 : 100; // default 100 if 3 or less

  return (
    <View style={styles.container}>
      {buttonsToRender.map((btn) => (
        <ActionButton
          key={btn.key}
          name={btn.name}
          maxWidth={maxWidth}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
});

export default ButtonContainer;
