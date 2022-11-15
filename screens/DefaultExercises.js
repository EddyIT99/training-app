import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";

import rootStore from "../store/rootStore";
import exerciseStore from "../store/exerciseStore";

import WorkoutCard from "../components/workout/WorkoutCard";

import { Observer } from "mobx-react";

const DefaultExercises = () => {
  //console.log(exerciseStore.defaultExercises)
  return (
    <Observer>
      {() => (
        <FlatList
          contentContainerStyle={{
            marginHorizontal: 10,
          }}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          data={exerciseStore.defaultExercises.slice()}
          numColumns={2}
          key={2}
          renderItem={({ item, index }) => (
            <WorkoutCard
              id={item.id}
              index={index}
              numColumns={2}
              onDefaultExerciseScreen={true}
              exercise={item.exercise}
            />
          )}
        />
      )}
    </Observer>
  );
};

export default DefaultExercises;

const styles = StyleSheet.create({});
