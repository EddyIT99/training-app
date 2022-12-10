import React from "react";
import { Text } from "react-native-paper";

export const StartExercise = ({ navigation, route }) => {
  const { exerciseName, exerciseId } = route.params;

  return (
    <Text style={{ color: "white" }}>
      {exerciseName}, {exerciseId}
    </Text>
  );
};

export default StartExercise;
