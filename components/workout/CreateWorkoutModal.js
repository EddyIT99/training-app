import { StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Overlay } from "@rneui/base";
import ImagePicker from "./ImagePicker";
import { v4 as uuidv4 } from "uuid";

import { useTheme } from "@react-navigation/native";

const CreateWorkoutModal = ({
  visible,
  setVisible,
  setWorkouts,
  workouts,
  setSnackbarVisible,
  exerciseName,
  setExerciseName,
}) => {
  const theme = useTheme();
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (visible) setExerciseName("");
  }, [visible]);

  const save = () => {
    setSnackbarVisible(true);
    setWorkouts((prev) => [
      ...prev,
      {
        id: uuidv4(),
        exercise: exerciseName,
        image: image,
        sets: 0,
        reps: 0,
      },
    ]);
    setVisible(false);
    setImage(null);
  };

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
      overlayStyle={styles.overlayStyle}
      style={styles.testStyle}
    >
      <Text style={[styles.saveButtonText, { color: "#000000" }]}>
        Add custom exercise
      </Text>
      <ImagePicker image={image} setImage={setImage} />
      <TextInput
        placeholder="Enter exercise name..."
        value={exerciseName}
        onChangeText={(text) => setExerciseName(text)}
        style={styles.workoutNameInput(theme)}
      />
      <TouchableOpacity
        style={styles.saveButton(exerciseName)}
        onPress={save}
        disabled={exerciseName === "" ? true : false}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </Overlay>
  );
};

export default CreateWorkoutModal;

const styles = StyleSheet.create({
  overlayStyle: {
    borderRadius: 10,
    width: "70%",
    height: "60%",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  workoutNameInput: (theme) => {
    return {
      paddingHorizontal: 10,
      height: 50,
      fontSize: 20,
      color: theme.colors.text,
      backgroundColor: theme.dark ? "#FFFFFF20" : "#00000020",
      width: "100%",
      borderRadius: 15,
    };
  },
  saveButton: (exerciseName) => {
    return {
      width: 100,
      height: 50,
      backgroundColor: exerciseName === "" ? "grey" : "green",
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
    };
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 30,
  },
});
