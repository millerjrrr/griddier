import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";
import { RangesStackParamsList } from "@src/types";
import MyRanges from "@src/screens/Ranges/MyRanges";
import RangesShop from "@src/screens/Ranges/RangesShop";
import { Platform } from "react-native";

const RangesStack =
  createStackNavigator<RangesStackParamsList>();

const RangesNavigator = () => {
  const screenOptions: StackNavigationOptions = {
    headerShown: false,
    cardStyle: {
      backgroundColor: "transparent",
    },
    cardOverlayEnabled: false,
    cardShadowEnabled: false,
    presentation: "transparentModal",
    ...(Platform.OS === "ios"
      ? TransitionPresets.ModalPresentationIOS
      : {}),
  };
  return (
    <RangesStack.Navigator screenOptions={screenOptions}>
      <RangesStack.Screen
        name="My Ranges"
        component={MyRanges}
      />
      <RangesStack.Screen
        name="Ranges Shop"
        component={RangesShop}
      />
    </RangesStack.Navigator>
  );
};

export default RangesNavigator;
