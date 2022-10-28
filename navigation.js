import React from "react";

import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";

import Home from "./screens/Home";
import Settings from "./screens/Settings";
import Statistics from "./screens/Statistics";
import CreateWorkout from "./screens/CreateWorkout";
import StartWorkout from "./screens/StartWorkout";
import EditWorkout from "./screens/EditWorkout";

import { useDarkMode } from "./context/themeContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#d35400",
    secondary: "#f39c12",
    background: "#222222",
    text: "#F5F5F5",
    headerColor: "#222222",
  },
};

const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#d35400",
    secondary: "#f39c12",
    headerColor: "#ffffff",
  },
};

const getTabBarIcon = (route, focused, color, size) => {
  let iconName;

  switch (route.name) {
    case "Home":
      iconName = focused ? "home" : "home-outline";
      break;
    case "Statistics":
      iconName = focused ? "ios-stats-chart" : "ios-stats-chart-outline";
      break;
    case "Settings":
      iconName = focused ? "settings" : "settings-outline";
      break;
    default:
      iconName = focused ? "home" : "home-outline";
      break;
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};

// Tab navigation component
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: "left",
        tabBarIcon: ({ focused, color, size }) => {
          return getTabBarIcon(route, focused, color, size);
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Statistics" component={Statistics} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

// Stack navigation component
function Navigation() {
  const darkMode = useDarkMode().darkMode;

  return (
    <NavigationContainer theme={darkMode ? CustomDarkTheme : CustomLightTheme}>
      <StatusBar
        style={darkMode ? "dark" : "light"}
        backgroundColor={
          darkMode
            ? CustomDarkTheme.colors.card
            : CustomLightTheme.colors.headerColor
        }
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
        }}
      >
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="CreateWorkout" component={CreateWorkout} />
        <Stack.Screen name="StartWorkout" component={StartWorkout} />
        <Stack.Screen name="EditWorkout" component={EditWorkout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
