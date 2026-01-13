import React from "react";
import Trainer from "@src/screens/Trainer";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationParamList } from "@src/types";
import Extras from "@src/screens/Extras";
import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RangesNavigator from "./RangesStack";
const { base } = screenDimensions();

const Tab =
  createMaterialTopTabNavigator<NavigationParamList>();

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: true,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "transparent",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.CONTRAST_A,
            height: 3 * base,
            borderRadius: 2 * base,
          },
          sceneStyle: {
            backgroundColor: "transparent",
          },
        }}
      >
        <Tab.Screen
          name="Trainer"
          component={Trainer}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name="controller-classic"
                size={40 * base}
                color={
                  focused
                    ? colors.CONTRAST_A
                    : colors.CONTRAST_C
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="Ranges List"
          component={RangesNavigator}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name="book-open-variant"
                size={40 * base}
                color={
                  focused
                    ? colors.CONTRAST_A
                    : colors.CONTRAST_C
                }
              />
            ),
          }}
        />
        <Tab.Screen
          name="Extras"
          component={Extras}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name="help-circle-outline"
                size={40 * base}
                color={
                  focused
                    ? colors.CONTRAST_A
                    : colors.CONTRAST_C
                }
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
