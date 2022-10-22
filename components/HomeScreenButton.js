import React from "react";
import { StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";

import { useNavigation } from "@react-navigation/native";

const HomeScreenButton = (props) => {
  const navigation = useNavigation();

  return (
    <TouchableNativeFeedback
      onPress={() => navigation.navigate(`${props.screen}`)}
    >
      <View style={styles.buttonStyle(props.theme)}>
        <Text style={styles.buttonTextStyle(props.theme)}>{props.text}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default HomeScreenButton;

const styles = StyleSheet.create({
  buttonStyle: (theme) => {
    return {
      backgroundColor: theme.dark ? "#333333" : "#FFFFFF",
      padding: 10,
      marginBottom: 10,
      borderRadius: 10,
      height: 125,
      alignItems: "center",
      justifyContent: "center",
    };
  },
  buttonTextStyle: (theme) => {
    return {
      fontSize: 18,
      fontStyle: "italic",
      color: theme.colors.text,
    };
  },
});
