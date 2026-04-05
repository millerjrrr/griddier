import { View } from "react-native";
import colors from "@src/utils/colors";
import {
  Filter,
  PositionName,
  positions,
  StackSize,
  stackSizes,
  VsActionFilter,
  vsActions,
} from "@src/types";
import { WhiteTextBold } from "@src/componentes/AppText";
import { AppTouchable } from "@src/componentes/AppPressables";
import appShadow from "@src/utils/appShadow";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilter,
  updateFilter,
} from "@src/store/trainer";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const SetFilterButton: React.FC<{
  name: PositionName | VsActionFilter | StackSize;
}> = ({ name }) => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const setUserPosition = (pos: PositionName | "") => {
    const update: Partial<Filter> = {
      pos: filter.pos === pos ? "" : pos,
    };
    dispatch(updateFilter(update));
  };

  const setVsAction = (action: VsActionFilter | "") => {
    const update: Partial<Filter> = {
      action: filter.action === action ? "" : action,
    };
    dispatch(updateFilter(update));
  };

  const setStackSize = (stack: StackSize | "") => {
    const update: Partial<Filter> = {
      stack: filter.stack === stack ? "" : stack,
    };
    dispatch(updateFilter(update));
  };

  const onPress =
    typeof name === "number"
      ? () => setStackSize(name)
      : vsActions.includes(name)
      ? () => setVsAction(name)
      : () => setUserPosition(name as PositionName | "");

  const selected = Object.values(filter).includes(name);
  const tintColor = selected ? colors.C1 : colors.BG3;

  return (
    <AppTouchable
      style={{
        backgroundColor: colors.BG1,
        borderRadius: 100 * base,
        padding: 3 * base,
        width: ![100, 150, 200, "R+3B"].includes(name)
          ? 30 * base
          : undefined,
        height: 30 * base,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 5 * base,
        ...(![50, 100, 150, 200].includes(name as any)
          ? appShadow(colors.C1)
          : {}),
      }}
      onPress={onPress}
    >
      <WhiteTextBold s={20 * base} color={tintColor}>
        {name}
      </WhiteTextBold>
    </AppTouchable>
  );
};

const FilterOptions = () => {
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
        {positions.map((position) => (
          <SetFilterButton key={position} name={position} />
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
          <SetFilterButton key={action} name={action} />
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
        {stackSizes.map((stack) => (
          <SetFilterButton key={stack} name={stack} />
        ))}
      </View>
    </View>
  );
};

export default FilterOptions;
