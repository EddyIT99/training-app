import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Headline } from "react-native-paper";

import WorkoutCard from "./WorkoutCard";

import { Observer } from "mobx-react";
import exerciseStore from "../../store/exerciseStore";

const Exercises = ({ exercises, screen }) => {
  return (
    <>
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 10,
          alignItems: "center",
        }}
      >
        <Headline>Select exercises</Headline>
      </View>
      <Observer>
        {() => (
          <FlatList
            contentContainerStyle={{
              marginHorizontal: 10,
            }}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            data={
              screen === "CreateWorkout"
                ? exerciseStore.defaultExercises.slice()
                : exercises
            }
            numColumns={2}
            key={2}
            renderItem={({ item, index }) => (
              <WorkoutCard
                id={item.id}
                index={index}
                numColumns={2}
                screen={screen}
                exercise={item.exercise}
                selected={item.selected}
              />
            )}
          />
        )}
      </Observer>
    </>
  );
};

export default Exercises;

const styles = StyleSheet.create({});
