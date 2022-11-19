import { Dimensions, StyleSheet, View, Pressable, Text } from "react-native";
import React from "react";

const ProgressBar = ({ goTo, currentStepIndex }) => {
  return (
    <>
      <View style={styles.progressBar}>
        <Pressable
          style={styles.progressButton("#333333")}
          onPress={() => goTo(0)}
        >
          <Text style={{ color: "#FFFFFF" }}>1</Text>
        </Pressable>
        <View
          style={[
            styles.line,
            {
              backgroundColor: currentStepIndex >= 1 ? "#333333" : "#00000050",
            },
          ]}
        ></View>
        <Pressable
          style={styles.progressButton(
            currentStepIndex >= 1 ? "#333333" : "#00000050"
          )}
          onPress={() => goTo(1)}
        >
          <Text style={{ color: "#FFFFFF" }}>2</Text>
        </Pressable>
        <View
          style={[
            styles.line,
            {
              backgroundColor: currentStepIndex === 2 ? "#333333" : "#00000050",
            },
          ]}
        ></View>
        <Pressable
          style={styles.progressButton(
            currentStepIndex >= 2 ? "#333333" : "#00000050"
          )}
          onPress={() => goTo(2)}
        >
          <Text style={{ color: "#FFFFFF" }}>3</Text>
        </Pressable>
      </View>
    </>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  progressBar: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
  progressButton: (bgColor) => {
    return {
      alignItems: "center",
      justifyContent: "center",
      width: 60,
      height: "100%",
      borderRadius: 50,
      backgroundColor: bgColor,
    };
  },
  line: {
    width: Dimensions.get("screen").width / 6,
    height: 4,
  },
});
