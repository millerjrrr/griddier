import React from "react";
import { Text, View } from "react-native";
import colors from "@/presentation/theme/colors";
import {
  appShadow,
  typography,
} from "@/presentation/theme";
import getAppDimensions from "@/presentation/theme/appDimensions";
import {
  ALL_STACK_SIZES,
  StackSize,
} from "@/domain/value-objects/StackSize";
import {
  ALL_POSITION_NAMES,
  PositionName,
} from "@/domain/value-objects/Position";
import { vsActions } from "@/domain/value-objects/VsActions";
import { AppTouchable } from "../AppPressables";
import { RangesFilter } from "@/presentation/types/rangeFilter";

const { base } = getAppDimensions();

type VsActionFilter = (typeof vsActions)[number];

type SetFilterButtonProps = {
  name: PositionName | VsActionFilter | StackSize;
  selected: boolean;
  onPress: () => void;
};

const SetFilterButton: React.FC<SetFilterButtonProps> = ({
  name,
  selected,
  onPress,
}) => {
  const tintColor = selected ? colors.C1 : colors.BG3;

  return (
    <AppTouchable
      style={{
        backgroundColor: colors.BG1,
        borderRadius: 100 * base,
        padding: 3 * base,
        width: ![100, 150, 200, "R+3B"].includes(
          name as any,
        )
          ? 30 * base
          : undefined,
        height: 30 * base,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 5 * base,
        ...(![50, 100, 150, 200].includes(name as any)
          ? appShadow("md", colors.C1)
          : {}),
      }}
      onPress={onPress}
    >
      <Text
        style={[typography.title, { color: tintColor }]}
      >
        {name}
      </Text>
    </AppTouchable>
  );
};

type FilterOptionsProps = {
  filter: RangesFilter;
  setFilter: React.Dispatch<
    React.SetStateAction<RangesFilter>
  >;
};

const FilterOptions: React.FC<FilterOptionsProps> = ({
  filter,
  setFilter,
}) => {
  const setUserPosition = (position: PositionName) => {
    setFilter((prev) => ({
      ...prev,
      position:
        prev.position === position ? null : position,
    }));
  };

  const setVsAction = (action: VsActionFilter) => {
    setFilter((prev) => ({
      ...prev,
      action: prev.action === action ? null : action,
    }));
  };

  const setStackSize = (stack: StackSize) => {
    setFilter((prev) => ({
      ...prev,
      stack: prev.stack === stack ? null : stack,
    }));
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 12 * base,
          padding: 4 * base,
        }}
      >
        {ALL_POSITION_NAMES.map((position) => (
          <SetFilterButton
            key={position}
            name={position}
            selected={filter.position === position}
            onPress={() => setUserPosition(position)}
          />
        ))}
      </View>

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          padding: 4 * base,
          paddingBottom: 3 * base,
        }}
      >
        {vsActions.map((action) => (
          <SetFilterButton
            key={action}
            name={action}
            selected={filter.action === action}
            onPress={() => setVsAction(action)}
          />
        ))}
      </View>

      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          padding: 4 * base,
          paddingBottom: 3 * base,
        }}
      >
        {ALL_STACK_SIZES.map((stack) => (
          <SetFilterButton
            key={stack}
            name={stack}
            selected={filter.stack === stack}
            onPress={() => setStackSize(stack)}
          />
        ))}
      </View>
    </View>
  );
};

export default FilterOptions;
