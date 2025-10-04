import { View } from "react-native";
import AddRangeButton from "./AddRangeButton";
import colors from "@src/utils/colors";
import FilterButton from "./FilterButton";
import FilterOptions from "./FilterOptions";
import { useSelector } from "react-redux";
import { selectFilter } from "@src/store/trainer";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const RangeListControls = () => {
  const filter = useSelector(selectFilter);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 16 * base,
          paddingBottom: 3 * base,
          backgroundColor: colors.PRIMARY,
        }}
      >
        <AddRangeButton />
        <FilterButton />
      </View>
      {filter.activated && <FilterOptions />}
    </View>
  );
};

export default RangeListControls;
