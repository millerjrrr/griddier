import { View } from "react-native";
import AddRangeButton from "./AddRangeButton";
import colors from "@src/utils/colors";
import FilterButton from "./FilterButton";
import FilterOptions from "./FilterOptions";
import { useSelector } from "react-redux";
import { selectFilter } from "@src/store/trainer";

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
          paddingTop: 16,
          paddingBottom: 3,
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
