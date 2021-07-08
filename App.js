import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import HomePage from "./src/components/Home";
import AddItem from "./src/components/AddItem";
import AddSelection from "./src/components/AddSelection";
import ViewItem from "./src/components/ViewItem";
import { informationTypes } from "./src/constants/informationTypes";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name={informationTypes.ITEM.add}
          component={AddItem}
          options={{ title: informationTypes.ITEM.addPageTitle }}
        />
        <Stack.Screen name={informationTypes.ITEM.view} component={ViewItem} />
        <Stack.Screen name="AddSelection" component={AddSelection} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
