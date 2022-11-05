import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

import DisplayModeButton from "./DisplayModeButton";

import { useTheme } from "@react-navigation/native";

const Header = (props) => {
  const [title, setTitle] = useState("");

  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={theme.dark ? "#FFFFFF60" : "#00000050"}
        value={title}
        onChangeText={(text) => setTitle(text)}
        style={styles.workoutNameInput(theme)}
      />

      <View style={{ flexDirection: "row", marginRight: 10 }}>
        <DisplayModeButton
          icon={
            props.displayStyle === 1 ? "view-agenda" : "view-agenda-outline"
          }
          onPress={() => props.setDisplayStyle(1)}
        />
        <DisplayModeButton
          icon={props.displayStyle === 2 ? "view-grid" : "view-grid-outline"}
          onPress={() => props.setDisplayStyle(2)}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  wrapper: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  workoutNameInput: (theme) => {
    return {
      marginLeft: 20,
      paddingHorizontal: 10,
      height: 50,
      fontSize: 20,
      color: theme.colors.text,
      backgroundColor: theme.dark ? "#FFFFFF20" : "#00000009",
      flex: 1,
      marginRight: 10,
      borderRadius: 15,
    };
  },
});
