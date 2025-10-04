import Entypo from "@expo/vector-icons/Entypo";
import colors from "@src/utils/colors";
import appShadow from "@src/utils/appShadow";
import { AppTouchable } from "@src/componentes/AppPressables";
import { useNavigation } from "@react-navigation/native";
import { RangesStackParamsList } from "@src/types";
import { StackNavigationProp } from "@react-navigation/stack";
import ControlButton from "./ControlButton";
import screenDimensions from "@src/utils/screenDimensions";
const { base } = screenDimensions();

const AddRangeButton = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<RangesStackParamsList>
    >();

  const goToRangesShop = () => {
    navigation.navigate("Ranges Shop");
  };

  return (
    <ControlButton onPress={goToRangesShop}>
      <Entypo
        name="plus"
        size={24 * base}
        color={colors.CONTRAST}
      />
    </ControlButton>
  );
};

export default AddRangeButton;
