import React from "react";
import { StyleSheet, ScrollView } from "react-native";

import { useTheme } from "@react-navigation/native";

import HomeScreenButton from "../components/HomeScreenButton";

const Home = () => {
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={{ padding: 10 }}>
      <HomeScreenButton screen={"Statistics"} text="Statistics" theme={theme} />
      <HomeScreenButton
        screen={"CreateWorkout"}
        text="Create Workout"
        theme={theme}
      />
      <HomeScreenButton
        screen={"StartWorkout"}
        text="Start Workout"
        theme={theme}
      />
      <HomeScreenButton
        screen={"EditWorkout"}
        text="Edit Workout"
        theme={theme}
      />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  test: {},
});
