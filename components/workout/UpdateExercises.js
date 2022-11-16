import React from "react";
import { View, FlatList, Text } from "react-native";
import { Headline } from "react-native-paper";
import AnimatedLottieView from "lottie-react-native";

import { Observer } from "mobx-react";

import WorkoutCard from "./WorkoutCard";

import rootStore from "../../store/rootStore";

const UpdateExercises = ({ selectExercise }) => {
  return (
    <>
      <View
        style={{
          marginHorizontal: 10,
          marginVertical: 10,
          alignItems: "center",
        }}
      >
        <Headline>Enter sets/reps</Headline>
      </View>
      {rootStore.exerciseStore.exercises.length === 0 && (
        <Observer>
          {() => (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <AnimatedLottieView
                autoPlay
                style={{ width: "75%" }}
                source={require("../../assets/lottie-animations/29951-healthy-lifestyle-exercise.json")}
              />
              <Text style={{ fontSize: 20 }}>No exercises added</Text>
            </View>
          )}
        </Observer>
      )}
      {rootStore.exerciseStore.exercises.length > 0 && (
        <Observer>
          {() => (
            <FlatList
              contentContainerStyle={{
                marginHorizontal: 10,
                paddingBottom: 10,
              }}
              ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
              data={rootStore.exerciseStore.exercises.slice()}
              numColumns={2}
              renderItem={({ item, index }) => (
                <WorkoutCard
                  id={item.id}
                  key={item.id}
                  index={index}
                  numColumns={2}
                  exercise={item.exercise}
                  sets={item.sets}
                  reps={item.reps}
                  selectExercise={selectExercise}
                />
              )}
            />
          )}
        </Observer>
      )}
    </>
  );
};

export default UpdateExercises;
