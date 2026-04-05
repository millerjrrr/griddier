import { NavigationContainer } from "@react-navigation/native";
import RangesNavigator from "./stacks/RangesStackNavigator";

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <RangesNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
