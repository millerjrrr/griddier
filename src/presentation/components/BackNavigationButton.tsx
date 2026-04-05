import { Entypo } from "@expo/vector-icons";
import { View } from "react-native";
import colors from "../theme/colors";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { AppTouchable } from "./AppPressables";
import getAppDimensions from "../theme/appDimensions";

const { base } = getAppDimensions();

const BackNavigationButton = () => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.goBack();
    // dispatch(updateFilter({ activated: false }));
  };

  return (
    <View
      style={{
        width: 100 * base,
        padding: 5,
        paddingHorizontal: 15,
        alignItems: "flex-start",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        zIndex: 1000,
      }}
    >
      <AppTouchable onPress={onPress}>
        <Entypo
          {...{
            name: "chevron-small-left",
            size: 36,
            color: colors.C1,
          }}
        />
      </AppTouchable>
    </View>
  );
};

export default BackNavigationButton;
