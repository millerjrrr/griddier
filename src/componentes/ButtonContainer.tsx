import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import ActionButton from "./ActionButton";
import { ActionName, GridName } from "../types";
import screenDimensions from "@src/utils/screenDimensions";
import useGetUserRange from "./../hooks/useGetUsersRange";
const { base } = screenDimensions();

interface ButtonsRowProps {
  gridName: GridName;
}

const ButtonContainer: React.FC<ButtonsRowProps> = ({
  gridName,
}) => {
  const getUserRange = useGetUserRange();
  const Range = getUserRange(gridName);
  const handsEntries = Object.values(Range.hands);

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
  const maxWidth =
    buttonsToRender.length === 4 ? 90 * base : 120 * base; // default 100 if 3 or less

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
    width: Platform.OS === "web" ? "100%" : undefined,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30 * base,
  },
});

export default ButtonContainer;
