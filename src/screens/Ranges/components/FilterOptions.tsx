import { View } from "react-native";
import colors from "@src/utils/colors";
import {
  Filter,
  PositionName,
  positions,
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
  name: PositionName | VsActionFilter;
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

  const onPress = vsActions.includes(name)
    ? () => setVsAction(name)
    : () => setUserPosition(name as PositionName | "");

  const selected = Object.values(filter).includes(name);
  const tintColor = selected
    ? colors.CONTRAST
    : colors.TERTIARY;

  return (
    <AppTouchable
      style={{
        backgroundColor: colors.PRIMARY,
        borderRadius: 100 * base,
        padding: 3 * base,
        width: name !== "R+3B" ? 30 * base : undefined,
        height: 30 * base,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 5 * base,
        ...appShadow(colors.CONTRAST),
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
          backgroundColor: colors.PRIMARY,
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
          backgroundColor: colors.PRIMARY,
        }}
      >
        {vsActions.map((position) => (
          <SetFilterButton key={position} name={position} />
        ))}
      </View>
    </View>
  );
};

export default FilterOptions;
