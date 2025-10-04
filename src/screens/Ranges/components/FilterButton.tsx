import Feather from "@expo/vector-icons/Feather";
import colors from "@src/utils/colors";
import ControlButton from "./ControlButton";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilter,
  updateFilter,
} from "@src/store/trainer";

const FilterButton = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const toggleFilter = () => {
    dispatch(
      updateFilter({ activated: !filter.activated })
    );
  };

  return (
    <ControlButton onPress={toggleFilter}>
      <Feather
        name="filter"
        size={24}
        color={colors.CONTRAST}
      />
    </ControlButton>
  );
};

export default FilterButton;
