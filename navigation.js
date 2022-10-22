import React from "react";
import { useColorScheme } from "react-native";

import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
  useTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "@expo/vector-icons/Ionicons";

import Home from "./screens/Home";
import Settings from "./screens/Settings";
import Statistics from "./screens/Statistics";
import CreateWorkout from "./screens/CreateWorkout";

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
  },
};

const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#d35400",
    secondary: "#f39c12",
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
  const scheme = useColorScheme();

  return (
    <NavigationContainer
      theme={scheme === "dark" ? CustomDarkTheme : CustomLightTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen name="CreateWorkout" component={CreateWorkout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
