import React from "react";
import Trainer from "@src/screens/Trainer";
import RangesList from "@src/screens/RangesList";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import useSetGridName from "@src/hooks/useSetGridName";
import { NavigationParamList } from "@src/types";

const Tab =
  createMaterialTopTabNavigator<NavigationParamList>();

const RootNavigator: React.FC = () => {
  useSetGridName();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { display: "none" },
          swipeEnabled: true,
        }}
      >
        <Tab.Screen name="Trainer" component={Trainer} />
        <Tab.Screen
          name="Ranges List"
          component={RangesList}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
