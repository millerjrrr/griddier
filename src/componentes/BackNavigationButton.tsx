import { Entypo } from "@expo/vector-icons";
import { View } from "react-native";
import colors from "@src/utils/colors";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { AppTouchable } from "./AppPressables";
import { useDispatch } from "react-redux";
import { updateFilter } from "@src/store/trainer";

const BackNavigationButton = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPress = () => {
    navigation.goBack();
    dispatch(updateFilter({ activated: false }));
  };

  return (
    <View
      style={{
        width: "100%",
        padding: 5,
        paddingHorizontal: 15,
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: colors.PRIMARY,
      }}
    >
      <AppTouchable onPress={onPress}>
        <Entypo
          {...{
            name: "chevron-small-left",
            size: 36,
            color: colors.CONTRAST,
          }}
        />
      </AppTouchable>
    </View>
  );
};

export default BackNavigationButton;
