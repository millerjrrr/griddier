import { View } from "react-native";
import AddRangeButton from "./AddRangeButton";
import getAppDimensions from "@/presentation/theme/appDimensions";
const { base } = getAppDimensions();

const RangeListControls: React.FC<{ noPlus?: boolean }> = ({
  noPlus,
}) => {
  // const filter = useSelector(selectFilter);

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
        {/* <FilterButton /> */}
      </View>
      {/* {filter.activated && <FilterOptions />} */}
    </View>
  );
};

export default RangeListControls;
