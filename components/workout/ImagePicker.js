import React from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity } from "react-native";
import * as ImagePick from "expo-image-picker";

import exerciseStore from "../../store/exerciseStore";
import { observer } from "mobx-react";
import { Icon } from "@rneui/base";

export default observer(function ImagePicker() {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePick.launchImageLibraryAsync({
      mediaTypes: ImagePick.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      exerciseStore.updateImage(result.uri);
    }
  };

  return (
    <TouchableOpacity style={styles.imageStyle} onPress={pickImage}>
      {!exerciseStore.newImage && (
        <>
          <Icon name="image" size={50} />
          <Text>Choose image</Text>
          <Text>(Optional)</Text>
        </>
      )}
      {exerciseStore.newImage && (
        <Image
          source={{ uri: exerciseStore.newImage }}
          style={{ width: "100%", height: "100%", borderRadius: 5 }}
        />
      )}
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  imageStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 200,
    backgroundColor: "#00000020",
    borderRadius: 5,
  },
});
