import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import HomePage from "./src/components/Home";
import AddItem from "./src/components/AddItem";
import AddSelection from "./src/components/AddSelection";
import ViewItem from "./src/components/ViewItem";
import { informationTypes } from "./src/constants/informationTypes";

const AddScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={informationTypes.ITEM.add}
        component={AddItem}
        options={{ title: informationTypes.ITEM.addPageTitle }}
      />
    </Stack.Navigator>
  );
};

const HomeScreenNavigator = () => {
  return (
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
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#1c74d3",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreenNavigator}
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={informationTypes.ITEM.add}
          component={AddScreenNavigator}
          options={{
            title: informationTypes.ITEM.addPageTitle,
            tabBarIcon: ({ color, size }) => (
              <Icon name="plus" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
