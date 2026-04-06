import Feather from "@expo/vector-icons/Feather";
import colors from "@/presentation/theme/colors";
import ControlButton from "./ControlButton";
import getAppDimensions from "@/presentation/theme/appDimensions";
const { base } = getAppDimensions();

const FilterButton: React.FC<{ toggle: () => void }> = ({
  toggle,
}) => {
  return (
    <ControlButton onPress={toggle}>
      <Feather
        name="filter"
        size={24 * base}
        color={colors.C1}
      />
    </ControlButton>
  );
};

export default FilterButton;
