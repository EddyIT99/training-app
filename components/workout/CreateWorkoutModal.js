import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Overlay } from "@rneui/base";
import {
  Headline,
  Subheading,
  Title,
  Paragraph,
  Text,
  Caption,
} from "react-native-paper";
import ImagePicker from "./ImagePicker";

import { useTheme } from "@react-navigation/native";

import store from "../../store/exerciseStore";
import { observer } from "mobx-react";

const CreateWorkoutModal = ({ visible, setVisible, setSnackbarVisible }) => {
  const theme = useTheme();

  const save = () => {
    setSnackbarVisible(true);
    store.addExcercise();
    setVisible(false);
  };

  function AddExcercise() {
    return (
      <>
        <Headline style={styles.headerText}>Add custom exercise</Headline>
        <TextInput
          placeholder="Enter exercise name..."
          value={store.newExcerciseName}
          onChangeText={(text) => store.updateNewExcerciseName(text)}
          style={styles.workoutNameInput(theme)}
        />
        <ImagePicker />

        <TouchableOpacity
          style={styles.saveButton(store.newExcerciseName)}
          onPress={save}
          disabled={store.newExcerciseName === "" ? true : false}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </>
    );
  }

  const AddExcerciseObserver = observer(AddExcercise);

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={() => {
        setVisible(false);
        store.updateNewExcerciseName("");
        store.updateImage("");
      }}
      overlayStyle={styles.overlayStyle}
    >
      <AddExcerciseObserver />
    </Overlay>
  );
};

export default CreateWorkoutModal;

const styles = StyleSheet.create({
  overlayStyle: {
    borderRadius: 15,
    padding: 20,
    width: "70%",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  headerText: {
    marginBottom: 20,
  },
  workoutNameInput: (theme) => {
    return {
      marginBottom: 20,
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
      marginTop: 20,
      width: "100%",
      height: 50,
      backgroundColor: exerciseName === "" ? "grey" : "green",
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
    };
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});
