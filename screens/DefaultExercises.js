import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";

import rootStore from "../store/rootStore";
import exerciseStore from "../store/exerciseStore";

import WorkoutCard from "../components/workout/WorkoutCard";

import { Observer } from "mobx-react";

const DefaultExercises = () => {
  const data = exerciseStore.defaultExercises.map((exercise) => {
    return { ...exercise, selected: false };
  });
  const [exercises, setExercises] = useState(data);

  function selectExercise(id) {
    let newExcerciseArr = exercises.map((exercise) => {
      if (exercise.id !== id) return exercise;
      else return { ...exercise, selected: !exercise.selected };
    });
    setExercises(newExcerciseArr);
  }

  return (
    <Observer>
      {() => (
        <FlatList
          contentContainerStyle={{
            marginHorizontal: 10,
          }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          data={exercises}
          numColumns={2}
          key={2}
          renderItem={({ item, index }) => (
            <WorkoutCard
              id={item.id}
              index={index}
              numColumns={2}
              onDefaultExerciseScreen={true}
              exercise={item.exercise}
              selected={item.selected}
              selectExcercise={selectExercise}
            />
          )}
        />
      )}
    </Observer>
  );
};

export default DefaultExercises;

const styles = StyleSheet.create({});
