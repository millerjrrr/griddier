import React from "react";
import Trainer from "@src/screens/Trainer";
import RangesList from "@src/screens/RangesList";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import useSetGridName from "@src/hooks/useSetGridName";
import { NavigationParamList } from "@src/types";
import Extras from "@src/screens/Extras";
import colors from "@src/utils/colors";
import screenDimensions from "@src/utils/screenDimensions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const { base } = screenDimensions();

const Tab =
  createMaterialTopTabNavigator<NavigationParamList>();

const RootNavigator: React.FC = () => {
  useSetGridName();
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
          tabBarLabelStyle: {
            fontSize: 18 * base, // <-- Increase this value to make text bigger
            fontWeight: "bold", // Optional: make it bold
            textTransform: "none", // Optional: prevent uppercase transformation
            color: colors.CONTRAST,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.CONTRAST, // Your pink glow color here
            height: 3 * base, // Optional: make it thicker or thinner
            borderRadius: 2 * base, // Optional: make the ends rounded
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
                color={colors.CONTRAST}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Ranges List"
          component={RangesList}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <MaterialCommunityIcons
                name="book-open-variant"
                size={40 * base}
                color={colors.CONTRAST}
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
                color={colors.CONTRAST}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
