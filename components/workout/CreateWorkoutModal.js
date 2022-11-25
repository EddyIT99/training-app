import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Overlay } from "@rneui/base";
import { Headline, Text } from "react-native-paper";
import ImagePicker from "./ImagePicker";

import { useTheme } from "@react-navigation/native";

import store from "../../store/exerciseStore";
import { observer } from "mobx-react";

const CreateWorkoutModal = ({ visible, setVisible, setSnackbarVisible }) => {
  const theme = useTheme();

  const save = () => {
    setSnackbarVisible(true);
    store.addExercise();
    setVisible(false);
  };

  function AddExercise() {
    return (
      <>
        <Headline style={styles.headerText}>Add custom exercise</Headline>
        <TextInput
          placeholder="Enter exercise name..."
          value={store.newExerciseName}
          onChangeText={(text) => store.updateNewExerciseName(text)}
          style={styles.workoutNameInput(theme)}
        />
        <ImagePicker />

        <TouchableOpacity
          style={styles.saveButton(store.newExerciseName)}
          onPress={save}
          disabled={store.newExerciseName === "" ? true : false}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </>
    );
  }

  const AddExerciseObserver = observer(AddExercise);

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={() => {
        setVisible(false);
        store.updateNewExerciseName("");
        store.updateImage("");
      }}
      overlayStyle={styles.overlayStyle}
    >
      <AddExerciseObserver />
    </Overlay>
  );
};

export default CreateWorkoutModal;

const styles = StyleSheet.create({
  overlayStyle: {
    borderRadius: 5,
    padding: 12,
    width: "70%",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  headerText: {
    marginBottom: 20,
  },
  workoutNameInput: (theme) => {
    return {
      marginBottom: 12,
      paddingHorizontal: 12,
      height: 50,
      fontSize: 20,
      color: theme.colors.text,
      backgroundColor: theme.dark ? "#FFFFFF20" : "#00000020",
      width: "100%",
      borderRadius: 5,
    };
  },
  saveButton: (exerciseName) => {
    return {
      marginTop: 12,
      width: "100%",
      height: 50,
      backgroundColor: exerciseName === "" ? "grey" : "green",
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
    };
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});
