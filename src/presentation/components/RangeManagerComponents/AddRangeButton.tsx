import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import ControlButton from "./ControlButton";
import getAppDimensions from "@/presentation/theme/appDimensions";
import { RangesStackParamList } from "@/presentation/navigation/types/RangesStackParamList";
import colors from "@/presentation/theme/colors";
const { base } = getAppDimensions();

const AddRangeButton = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RangesStackParamList>
    >();

  const goToRangesShop = () => {
    navigation.navigate("Ranges Shop");
  };

  return (
    <ControlButton onPress={goToRangesShop}>
      <Entypo
        name="plus"
        size={24 * base}
        color={colors.C1}
      />
    </ControlButton>
  );
};

export default AddRangeButton;
