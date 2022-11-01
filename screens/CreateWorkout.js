import React, { useState } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";

import { Button, Icon } from "@rneui/base";

import { useTheme } from "@react-navigation/native";

import Header from "../components/workout/Header";
import WorkoutCard from "../components/workout/WorkoutCard";
import CreateWorkoutModal from "../components/workout/CreateWorkoutModal";

import { workouts as data } from "../assets/data";

const CreateWorkout = () => {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const [displayStyle, setDisplayStyle] = useState(2);
  const [workouts, setWorkouts] = useState(data);

  function increaseAmount(id, type) {
    let newArr = workouts.map((workout) => {
      if (id !== workout.id) return workout;
      switch (type) {
        case "sets":
          return { ...workout, sets: workout.sets + 1 };
        case "reps":
          return { ...workout, reps: workout.reps + 1 };
        default:
          return { ...workout };
      }
    });
    setWorkouts(newArr);
  }

  function decreaseAmount(id, type) {
    let newArr = workouts.map((workout) => {
      if (id !== workout.id) return workout;
      switch (type) {
        case "sets":
          return { ...workout, sets: workout.sets > 0 ? workout.sets - 1 : 0 };
        case "reps":
          return { ...workout, reps: workout.reps > 0 ? workout.reps - 1 : 0 };
        default:
          return { ...workout };
      }
    });
    setWorkouts(newArr);
  }

  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
      <Header
        placeholder="Name workout..."
        displayStyle={displayStyle}
        setDisplayStyle={setDisplayStyle}
      />
      <FlatList
        style={{ marginTop: 10 }}
        contentContainerStyle={{ marginHorizontal: 20 }}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        data={workouts}
        numColumns={displayStyle}
        key={displayStyle}
        renderItem={({ item, index }) => (
          <WorkoutCard
            key={index}
            id={item.id}
            index={index}
            numColumns={displayStyle}
            exercise={item.exercise}
            sets={item.sets}
            reps={item.reps}
            increaseAmount={increaseAmount}
            decreaseAmount={decreaseAmount}
          />
        )}
      />
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

      <CreateWorkoutModal visible={visible} setVisible={setVisible} />
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
});
