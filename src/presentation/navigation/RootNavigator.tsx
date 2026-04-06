import React from "react";
import Trainer from "../screens/Trainer";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TabNavigationParamList } from "./types/TabNavigationParamList";
import Extras from "../screens/Extras";
import colors from "../theme/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import getAppDimensions from "../theme/appDimensions";
import RangesStackNavigator from "./stacks/RangesStackNavigator";
const { base } = getAppDimensions();

const Tab =
  createMaterialTopTabNavigator<TabNavigationParamList>();

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        id="Main Stack"
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
            backgroundColor: colors.C1,
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
                color={focused ? colors.C1 : colors.C3}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Ranges List"
          component={RangesStackNavigator}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name="book-open-variant"
                size={40 * base}
                color={focused ? colors.C1 : colors.C3}
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
                color={focused ? colors.C1 : colors.C3}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
