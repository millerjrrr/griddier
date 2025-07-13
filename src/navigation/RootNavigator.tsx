import React from "react";
import Trainer from "@src/screens/Trainer";
import RangesList from "@src/screens/RangesList";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import useSetGridName from "@src/hooks/useSetGridName";
import { NavigationParamList } from "@src/types";
import Settings from "@src/screens/Settings";

const Tab =
  createMaterialTopTabNavigator<NavigationParamList>();

const RootNavigator: React.FC = () => {
  useSetGridName();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: true,
          tabBarStyle: {
            backgroundColor: "transparent",
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
          },
          tabBarLabelStyle: {
            fontSize: 18, // <-- Increase this value to make text bigger
            fontWeight: "bold", // Optional: make it bold
            textTransform: "none", // Optional: prevent uppercase transformation
          },
          tabBarIndicatorStyle: {
            backgroundColor: "#ff69b4", // Your pink glow color here
            height: 3, // Optional: make it thicker or thinner
            borderRadius: 2, // Optional: make the ends rounded
          },
        }}
      >
        <Tab.Screen name="Trainer" component={Trainer} />
        <Tab.Screen
          name="Ranges List"
          component={RangesList}
        />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
