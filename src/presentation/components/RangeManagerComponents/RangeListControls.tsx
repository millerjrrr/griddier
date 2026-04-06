import { Text, View } from "react-native";
import AddRangeButton from "./AddRangeButton";
import getAppDimensions from "@/presentation/theme/appDimensions";
import FilterButton from "./FilterButton";
import FilterOptions from "./FilterOptions";
import { RangesFilter } from "@/presentation/types/rangeFilter";
const { base } = getAppDimensions();

type RangeListControlsProps = {
  noPlus?: boolean;
  filter: RangesFilter;
  setFilter: React.Dispatch<
    React.SetStateAction<RangesFilter>
  >;
  clearFilter: () => void;
};

const RangeListControls: React.FC<
  RangeListControlsProps
> = ({ noPlus, filter, setFilter, clearFilter }) => {
  const toggleFilter = () => {
    setFilter({ ...filter, activated: !filter.activated });
  };

  return (
    <View
      style={{
        position: "absolute",
        width: "100%",
        zIndex: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 16 * base,
          paddingBottom: 3 * base,
        }}
      >
        {!noPlus && <AddRangeButton />}
        <FilterButton toggle={toggleFilter} />
      </View>
      {filter.activated && (
        <FilterOptions
          filter={filter}
          setFilter={setFilter}
        />
      )}
    </View>
  );
};

export default RangeListControls;
