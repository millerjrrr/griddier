import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";
import { RangesStackParamsList } from "@src/types";
import MyRanges from "@src/screens/Ranges/MyRanges";
import RangesShop from "@src/screens/Ranges/RangesShop";

const RangesStack =
  createStackNavigator<RangesStackParamsList>();

const RangesNavigator = () => {
  const screenOptions: StackNavigationOptions = {
    headerShown: false,
    ...TransitionPresets.ModalPresentationIOS,
  };
  return (
    <RangesStack.Navigator screenOptions={screenOptions}>
      <RangesStack.Screen
        name="MyRanges"
        component={MyRanges}
      />
      <RangesStack.Screen
        name="RangesShop"
        component={RangesShop}
      />
    </RangesStack.Navigator>
  );
};

export default RangesNavigator;
