import React from "react";
import { StyleSheet, View, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Headline, Subheading, Title } from "react-native-paper";

const HomeScreenButton = (props) => {
  const navigation = useNavigation();
  const height = Dimensions.get("screen").height;

  return (
    <TouchableOpacity
      style={styles.buttonStyle(props.theme, height)}
      onPress={() =>
        navigation.navigate(`${props.screen}`, {
          title: props.text,
          screenType: props.type,
        })
      }
    >
      <Title style={styles.buttonTextStyle(props.theme)}>{props.text}</Title>
    </TouchableOpacity>
  );
};

export default HomeScreenButton;

const styles = StyleSheet.create({
  buttonStyle: (theme, height) => {
    return {
      flex: 1,
      backgroundColor: theme.dark ? theme.colors.card : "#FFFFFF",
      borderRadius: 10,
      paddingHorizontal: 16,
      paddingVertical: 8,
    };
  },
  buttonTextStyle: (theme) => {
    return {
      color: theme.colors.text,
    };
  },
});
