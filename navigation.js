import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";

import Home from "./screens/Home";
import Settings from "./screens/Settings";
import Statistics from "./screens/Statistics";
import CreateWorkout2 from "./screens/CreateWorkout2";
import StartWorkout from "./screens/StartWorkout";
import EditWorkout from "./screens/EditWorkout";
import DefaultExercises from "./screens/DefaultExercises";

import { useDarkMode } from "./context/themeContext";

import { CustomDarkTheme, CustomLightTheme } from "./assets/globalStyle";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
        style={darkMode ? "light" : "dark"}
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

        <Stack.Screen
          name="CreateWorkout2"
          component={CreateWorkout2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DefaultExercises"
          component={DefaultExercises}
          options={{ headerTitle: "Choose excercises" }}
        />
        <Stack.Screen
          name="StartWorkout"
          component={StartWorkout}
          options={{ headerTitle: "Start workout" }}
        />
        <Stack.Screen
          name="EditWorkout"
          component={EditWorkout}
          options={{ headerTitle: "Edit workout" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
