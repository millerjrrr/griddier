import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";
import { Platform } from "react-native";
import { RangesStackParamList } from "../types/RangesStackParamList";
import RangesShop from "@/presentation/screens/RangeManager/RangesShop";
import MyRanges from "@/presentation/screens/RangeManager/MyRanges";

const RangesStack =
  createStackNavigator<RangesStackParamList>();

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
    <RangesStack.Navigator
      id="Ranges Stack"
      screenOptions={screenOptions}
    >
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
