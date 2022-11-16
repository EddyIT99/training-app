import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import { Divider, Paragraph } from "react-native-paper";

import ProgressBar from "../components/workout/ProgressBar";
import DefaultExercises from "../components/workout/DefaultExercises";
import UpdateExercises from "../components/workout/UpdateExercises";
import EnterName from "../components/workout/EnterName";

import { useMultistepPage } from "../hooks/useMultistepPage";
import { useTheme } from "@react-navigation/native";

import exerciseStore from "../store/exerciseStore";
import workoutStore from "../store/workoutStore";
import rootStore from "../store/rootStore";

import { Observer } from "mobx-react";

const CreateWorkout2 = ({ navigation }) => {
  const theme = useTheme();

  const data = exerciseStore.defaultExercises.map((exercise) => {
    return { ...exercise, sets: 0, reps: 0, selected: false };
  });
  const [exercises, setExercises] = useState(data);
  const [workoutName, setWorkoutName] = useState("");

  function selectExercise(id) {
    let newExerciseArr = exercises.map((exercise) => {
      if (exercise.id !== id) return exercise;
      else return { ...exercise, selected: !exercise.selected };
    });
    setExercises(newExerciseArr);
  }

  const { step, steps, goTo, next, back, currentStepIndex } = useMultistepPage([
    <DefaultExercises exercises={exercises} selectExercise={selectExercise} />,
    <UpdateExercises selectExercise={selectExercise} />,
    <EnterName workoutName={workoutName} setWorkoutName={setWorkoutName} />,
  ]);

  function saveWorkout() {
    console.log(workoutName);
    rootStore.workoutStore.addWorkout(
      workoutName,
      rootStore.exerciseStore.exercises
    );
    rootStore.exerciseStore.deleteAddedExercises();
    navigation.navigate("Home");
  }

  function cancel() {
    rootStore.exerciseStore.deleteAddedExercises();
    navigation.navigate("Home");
  }

  return (
    <View style={{ flex: 1 }}>
      <ProgressBar currentStepIndex={currentStepIndex} goTo={goTo} />
      <Divider style={{ height: 1 }} />
      {step}
      <Divider style={{ height: 1 }} />
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.buttonStyle,
            {
              borderColor: theme.colors.primary,
            },
          ]}
          onPress={() => (currentStepIndex !== 0 ? back() : cancel())}
        >
          <Paragraph>{currentStepIndex !== 0 ? "Back" : "Cancel"}</Paragraph>
        </TouchableOpacity>
        <View style={{ width: 10 }}></View>

        <Observer>
          {() => (
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
          )}
        </Observer>
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
