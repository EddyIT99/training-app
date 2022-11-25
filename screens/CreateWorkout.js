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

import { Observer } from "mobx-react";
import { Button, Icon } from "@rneui/base";
import CreateWorkoutModal from "../components/workout/CreateWorkoutModal";

const CreateWorkout = ({ navigation }) => {
  const theme = useTheme();

  const data = exerciseStore.defaultExercises.map((exercise) => {
    return { ...exercise, sets: 0, reps: 0, selected: false };
  });
  const [exercises, setExercises] = useState(data);
  const [workoutName, setWorkoutName] = useState("");
  const [visible, setVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

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
    workoutStore.addWorkout(workoutName, exerciseStore.exercises);
    exerciseStore.deleteAddedExercises();
    navigation.navigate("Home");
  }

  function cancel() {
    exerciseStore.deleteAddedExercises();
    navigation.navigate("Home");
  }

  return (
    <View style={{ flex: 1 }}>
      <ProgressBar currentStepIndex={currentStepIndex} goTo={goTo} />
      <Divider style={{ height: 1 }} />
      {step}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.buttonStyle(theme)}
          onPress={() => (currentStepIndex !== 0 ? back() : cancel())}
        >
          <Paragraph>{currentStepIndex !== 0 ? "Back" : "Cancel"}</Paragraph>
        </TouchableOpacity>
        {currentStepIndex !== steps.length - 1 ? (
          <TouchableOpacity
            style={[styles.buttonStyle(theme), { marginHorizontal: 10 }]}
            onPress={() => setVisible(true)}
          >
            <Paragraph style={{ margin: 0, padding: 0 }}>Add custom</Paragraph>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 10 }} />
        )}
        <Observer>
          {() => (
            <TouchableOpacity
              style={styles.buttonStyle(theme)}
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
      <CreateWorkoutModal
        visible={visible}
        setVisible={setVisible}
        setSnackbarVisible={setSnackbarVisible}
      />
    </View>
  );
};

export default CreateWorkout;

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    height: 70,
  },
  buttonStyle: (theme) => {
    return {
      flex: 1,
      height: "100%",
      borderWidth: 2,
      borderColor: theme.colors.primary,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
    };
  },
});
