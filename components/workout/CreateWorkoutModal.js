import { StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";
import React, { useState } from "react";
import { Overlay } from "@rneui/base";
import ImagePicker from "./ImagePicker";

import { useTheme } from "@react-navigation/native";

const CreateWorkoutModal = ({ visible, setVisible, setWorkouts }) => {
  const theme = useTheme();
  const [image, setImage] = useState(null);

  const save = () => {
    // setWorkouts((prev) => [...prev, {
    // }])
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
      <TextInput style={styles.workoutNameInput(theme)}></TextInput>
      <ImagePicker image={image} setImage={setImage} />
      <TouchableOpacity style={styles.saveButton} onPress={save}>
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
  saveButton: {
    width: 100,
    height: 50,
    backgroundColor: "green",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 22,
  },
});
