import { StyleSheet, View } from "react-native"
import React from "react"
import { Button } from "@rneui/base"

const ProgressBar = ({ goTo, currentStepIndex }) => {
  return (
    <View style={styles.progressBar}>
      <Button
        color={"#333333"}
        buttonStyle={styles.progressButton}
        radius={50}
        onPress={() => goTo(0)}
      >
        1
      </Button>
      <View
        style={[
          styles.line,
          { backgroundColor: currentStepIndex >= 1 ? "#333333" : "#00000050" },
        ]}
      ></View>
      <Button
        color={currentStepIndex >= 1 ? "#333333" : "#00000050"}
        buttonStyle={styles.progressButton}
        radius={50}
        onPress={() => goTo(1)}
      >
        2
      </Button>
      <View
        style={[
          styles.line,
          {
            backgroundColor: currentStepIndex === 2 ? "#333333" : "#00000050",
          },
        ]}
      ></View>
      <Button
        color={currentStepIndex === 2 ? "#333333" : "#00000050"}
        buttonStyle={styles.progressButton}
        radius={50}
        onPress={() => goTo(2)}
      >
        3
      </Button>
    </View>
  )
}

export default ProgressBar

const styles = StyleSheet.create({
  progressBar: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 20,
  },
  progressButton: {
    width: 60,
    height: 60,
  },
  line: {
    marginTop: 30,
    width: 80,
    height: 4,
  },
})
