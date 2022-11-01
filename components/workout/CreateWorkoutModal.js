import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Overlay } from "@rneui/base";
import { launchImageLibrary } from "react-native-image-picker";

const CreateWorkoutModal = ({ visible, setVisible }) => {
  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
      overlayStyle={styles.overlayStyle}
    >
      <TextInput></TextInput>
      <TouchableOpacity style={styles.imageStyle}>
        <Text>Välj bild</Text>
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
  },
  imageStyle: {
    width: 200,
    height: 200,
    backgroundColor: "#FFFFFF",
  },
});
