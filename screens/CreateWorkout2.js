import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";

import { Paragraph } from "react-native-paper";

import ProgressBar from "../components/workout/ProgressBar";
import DefaultExercises from "./DefaultExercises";

import { useMultistepPage } from "../hooks/useMultistepPage";
import { useTheme } from "@react-navigation/native";

const CreateWorkout2 = () => {
  const theme = useTheme();
  const { step, steps, goTo, next, back, currentStepIndex } = useMultistepPage([
    <DefaultExercises />,
    <View style={{ flex: 1 }}>
      <Paragraph>TESTING</Paragraph>
    </View>,
    <View style={{ flex: 1 }}>
      <Paragraph>TESTING TEST SETSETSET</Paragraph>
    </View>,
  ]);

  function saveWorkout() {
    console.log("Save Workout");
  }

  return (
    <View style={{ flex: 1 }}>
      <ProgressBar currentStepIndex={currentStepIndex} goTo={goTo} />
      {step}
      <View style={styles.footer}>
        <TouchableOpacity
          disabled={currentStepIndex === 0}
          style={[
            styles.buttonStyle,
            {
              borderColor:
                currentStepIndex != 0 ? theme.colors.primary : "transparent",
            },
          ]}
          onPress={() => back()}
        >
          <Paragraph>{currentStepIndex != 0 && "Back"}</Paragraph>
        </TouchableOpacity>
        <View style={{ width: 10 }}></View>

        <TouchableOpacity
          style={[
            styles.buttonStyle,
            {
              backgroundColor: theme.colors.primary,
              borderColor: theme.colors.primary,
            },
          ]}
          onPress={() =>
            currentStepIndex !== steps.length - 1 ? next() : saveWorkout()
          }
        >
          <Paragraph>
            {currentStepIndex !== steps.length - 1 ? "Next" : "Save"}
          </Paragraph>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateWorkout2;

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    paddingVertical: 10,
    height: 70,
  },
  buttonStyle: {
    flex: 1,
    height: "100%",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});
