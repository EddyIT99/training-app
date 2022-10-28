import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const HomeScreenButton = (props) => {
  const navigation = useNavigation();
  const height = Dimensions.get("window").height;

  return (
    <TouchableOpacity onPress={() => navigation.navigate(`${props.screen}`)}>
      <View style={styles.buttonStyle(props.theme, height)}>
        <Text style={styles.buttonTextStyle(props.theme)}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HomeScreenButton;

const styles = StyleSheet.create({
  buttonStyle: (theme, height) => {
    return {
      backgroundColor: theme.dark ? "#333333" : "#FFFFFF",
      padding: 10,
      borderRadius: 30,
      height: height / 4.5,
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
