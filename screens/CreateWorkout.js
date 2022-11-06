import React, { useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";

import { Button, Icon } from "@rneui/base";
import { Snackbar } from "react-native-paper";

import { useTheme } from "@react-navigation/native";

import Header from "../components/workout/Header";
import WorkoutCard from "../components/workout/WorkoutCard";
import CreateWorkoutModal from "../components/workout/CreateWorkoutModal";

// import { workouts as data } from "../assets/data";
import { observer } from "mobx-react";

import store from "../store/store";

const CreateWorkout = () => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [displayStyle, setDisplayStyle] = useState(2);
  // const [workouts, setWorkouts] = useState(data);
  const [exerciseName, setExerciseName] = useState("");

  // function deleteExercise(name) {
  //   const newArr = data.filter((exercise) => {
  //     if (exercise.name !== name) return exercise;
  //   });
  //   setWorkouts(newArr);
  // }

  // function increaseAmount(id, type) {
  //   let newArr = workouts.map((workout) => {
  //     if (id !== workout.id) return workout;
  //     switch (type) {
  //       case "sets":
  //         return { ...workout, sets: workout.sets + 1 };
  //       case "reps":
  //         return { ...workout, reps: workout.reps + 1 };
  //       default:
  //         return { ...workout };
  //     }
  //   });
  //   setWorkouts(newArr);
  // }

  // function decreaseAmount(id, type) {
  //   let newArr = workouts.map((workout) => {
  //     if (id !== workout.id) return workout;
  //     switch (type) {
  //       case "sets":
  //         return { ...workout, sets: workout.sets > 0 ? workout.sets - 1 : 0 };
  //       case "reps":
  //         return { ...workout, reps: workout.reps > 0 ? workout.reps - 1 : 0 };
  //       default:
  //         return { ...workout };
  //     }
  //   });
  //   setWorkouts(newArr);
  // }

  function renderRow(item) {}

  function ExcerciseList() {
    return (
      <FlatList
        style={{ marginTop: 10 }}
        contentContainerStyle={{ marginHorizontal: 20 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        data={store.excercises.slice()}
        numColumns={displayStyle}
        key={displayStyle}
        renderItem={({ item, index }) => (
          <WorkoutCard
            key={item.id}
            index={index}
            numColumns={displayStyle}
            exercise={item.exercise}
            sets={item.sets}
            reps={item.reps}
            // increaseAmount={increaseAmount}
            // decreaseAmount={decreaseAmount}
          />
        )}
      />
    );
  }

  const ExcerciseListObserver = observer(ExcerciseList);

  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
      <Header
        placeholder="Name workout..."
        displayStyle={displayStyle}
        setDisplayStyle={setDisplayStyle}
      />
      {store.excercises.length === 0 && (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <Text style={{ fontSize: 20 }}>No workouts added</Text>
        </View>
      )}
      {store.excercises.length > 0 && <ExcerciseListObserver />}

      <View style={styles.addButtonWrapper}>
        <Text
          style={{ marginBottom: 5, fontSize: 16, color: theme.colors.text }}
        >
          Add exercises
        </Text>
        <Button
          icon={<Icon name="add" />}
          radius={50}
          color={theme.colors.primary}
          buttonStyle={{ width: 60, height: 60 }}
          onPress={() => setVisible(true)}
        />
      </View>

      <View style={styles.doneButtonWrapper}>
        <Button
          icon={<Icon name="done" />}
          radius={50}
          color={"success"}
          buttonStyle={{ width: 60, height: 60 }}
        />
      </View>

      <CreateWorkoutModal
        visible={visible}
        setVisible={setVisible}
        setSnackbarVisible={setSnackbarVisible}
      />

      <Snackbar
        style={styles.snackbarStyle}
        visible={snackbarVisible}
        onDismiss={() => {
          setSnackbarVisible(false);
          store.updateSnackBarText("");
        }}
        duration={3000}
        action={{
          label: "Undo",
          onPress: () => store.deleteExercise(),
        }}
      >
        Added exercise '{store.snackBarText}'
      </Snackbar>
    </View>
  );
};

export default CreateWorkout;

const styles = StyleSheet.create({
  addButtonWrapper: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    alignItems: "center",
  },
  doneButtonWrapper: {
    position: "absolute",
    bottom: 20,
    right: 20,
    alignItems: "center",
  },
  snackbarStyle: {
    borderRadius: 20,
  },
});
