import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { useTheme } from "@react-navigation/native";

const WorkoutCard = ({
  id,
  exercise,
  sets,
  reps,
  index,
  numColumns,
  increaseAmount,
  decreaseAmount,
}) => {
  const theme = useTheme();

  function rightMargin() {
    switch (numColumns) {
      case 1:
        return 0;
      case 2:
        return index % 2 !== 0 ? 0 : 10;
      default:
        return 0;
    }
  }

  return (
    <View style={styles.cardWrapper(theme, rightMargin)}>
      <View style={styles.innerCardWrapper}>
        <Text style={styles.exerciseTitle(theme)}>{exercise}</Text>
        <View style={numColumns === 2 && { width: "80%" }}>
          <View style={styles.setsAndRepsWrapper}>
            <View>
              <Text style={styles.setsAndRepsText(theme)}>Sets</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.button(theme)}
                onPress={() => decreaseAmount(id, "sets")}
              >
                <Text style={styles.buttonText(theme)}>-</Text>
              </TouchableOpacity>
              <View style={styles.amount(theme)}>
                <Text style={styles.setsAndRepsAmountText(theme)}>{sets}</Text>
              </View>
              <TouchableOpacity
                style={styles.button(theme)}
                onPress={() => increaseAmount(id, "sets")}
              >
                <Text style={styles.buttonText(theme)}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.setsAndRepsWrapper}>
            <Text style={styles.setsAndRepsText(theme)}>Reps</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={styles.button(theme)}
                onPress={() => decreaseAmount(id, "reps")}
              >
                <Text style={styles.buttonText(theme)}>-</Text>
              </TouchableOpacity>
              <View style={styles.amount(theme)}>
                <Text style={styles.setsAndRepsAmountText(theme)}>{reps}</Text>
              </View>
              <TouchableOpacity
                style={styles.button(theme)}
                onPress={() => increaseAmount(id, "reps")}
              >
                <Text style={styles.buttonText(theme)}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default WorkoutCard;

const styles = StyleSheet.create({
  cardWrapper: (theme, rightMargin) => {
    return {
      backgroundColor: theme.dark ? "#FFFFFF20" : "#00000020",
      flex: 0.5,
      marginRight: rightMargin(),
      borderRadius: 15,
    };
  },
  innerCardWrapper: {
    width: "100%",
    padding: 10,
    alignItems: "center",
  },
  exerciseTitle: (theme) => {
    return {
      color: theme.colors.text,
      fontSize: 20,
      fontWeight: "500",
      marginVertical: 10,
    };
  },
  setsAndRepsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  setsAndRepsText: (theme) => {
    return {
      color: theme.colors.text,
      fontSize: 16,
    };
  },
  setsAndRepsAmountText: (theme) => {
    return { color: theme.colors.text };
  },
  button: (theme) => {
    return {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.dark ? "#FFFFFF30" : "#00000015",
    };
  },
  amount: (theme) => {
    return {
      width: 35,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.dark ? "#FFFFFF60" : "#F5F5F5",
    };
  },
  buttonText: (theme) => {
    return {
      color: theme.colors.text,
      fontSize: 20,
    };
  },
});
