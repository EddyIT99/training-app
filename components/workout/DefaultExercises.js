import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Headline } from "react-native-paper";

import WorkoutCard from "./WorkoutCard";

import { Observer } from "mobx-react";

const DefaultExercises = ({ exercises, selectExercise }) => {
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
              paddingBottom: 10,
            }}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            data={exercises}
            numColumns={2}
            key={2}
            renderItem={({ item, index }) => (
              <WorkoutCard
                id={item.id}
                index={index}
                numColumns={2}
                currentScreen="defaultExercises"
                exercise={item.exercise}
                selected={item.selected}
                selectExercise={selectExercise}
              />
            )}
          />
        )}
      </Observer>
    </>
  );
};

export default DefaultExercises;

const styles = StyleSheet.create({});
