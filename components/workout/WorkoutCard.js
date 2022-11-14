import React from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"

import { useTheme } from "@react-navigation/native"
import { Icon } from "@rneui/base"
import rootStore from "../../store/rootStore"
import { Headline, Paragraph, Title } from "react-native-paper"

const WorkoutCard = ({
  id,
  exercise,
  sets,
  reps,
  index,
  numColumns,
  onDefaultExerciseScreen,
}) => {
  const theme = useTheme()

  function rightMargin() {
    switch (numColumns) {
      case 1:
        return 0
      case 2:
        return index % 2 !== 0 ? 0 : 10
      default:
        return 0
    }
  }

  if (onDefaultExerciseScreen) {
    return (
      <TouchableOpacity
        style={styles.cardWrapper(theme, rightMargin)}
        onPress={() => {
          console.log(id)
        }}
      >
        <View style={[styles.innerCardWrapper, { height: 140 }]}>
          <Title style={styles.exerciseTitle(theme)}>{exercise}</Title>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.cardWrapper(theme, rightMargin)}>
      <View style={styles.innerCardWrapper}>
        <Title style={styles.exerciseTitle(theme)}>{exercise}</Title>
        <View style={numColumns === 2 && { width: "80%" }}>
          <View style={styles.setsAndRepsWrapper}>
            <View>
              <Paragraph style={styles.setsAndRepsText(theme)}>Sets</Paragraph>
            </View>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <TouchableOpacity
                style={styles.button(theme)}
                onPress={() =>
                  rootStore.excerciseStore.decreaseAmount(id, "sets")
                }
              >
                <Text style={styles.buttonText(theme)}>-</Text>
              </TouchableOpacity>
              <View style={styles.amount(theme)}>
                <Text style={styles.setsAndRepsAmountText(theme)}>{sets}</Text>
              </View>
              <TouchableOpacity
                style={styles.button(theme)}
                onPress={() =>
                  rootStore.excerciseStore.increaseAmount(id, "sets")
                }
              >
                <Text style={styles.buttonText(theme)}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.setsAndRepsWrapper}>
            <Paragraph style={styles.setsAndRepsText(theme)}>Reps</Paragraph>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <TouchableOpacity
                style={styles.button(theme)}
                onPress={() =>
                  rootStore.excerciseStore.decreaseAmount(id, "reps")
                }
              >
                <Text style={styles.buttonText(theme)}>-</Text>
              </TouchableOpacity>
              <View style={styles.amount(theme)}>
                <Text style={styles.setsAndRepsAmountText(theme)}>{reps}</Text>
              </View>
              <TouchableOpacity
                style={styles.button(theme)}
                onPress={() =>
                  rootStore.excerciseStore.increaseAmount(id, "reps")
                }
              >
                <Text style={styles.buttonText(theme)}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          borderBottomEndRadius: 15,
          borderBottomStartRadius: 15,
          height: 30,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => rootStore.excerciseStore.deleteExercise(id)}
      >
        <Icon name="delete-outline" size={25} />
      </TouchableOpacity>
    </View>
  )
}

export default WorkoutCard

const styles = StyleSheet.create({
  cardWrapper: (theme, rightMargin) => {
    return {
      backgroundColor: theme.dark ? "#FFFFFF20" : "#00000020",
      flex: 0.5,
      marginRight: rightMargin(),
      borderRadius: 15,
      justifyContent: "center",
    }
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
      marginBottom: 10,
    }
  },
  setsAndRepsWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  setsAndRepsText: (theme) => {
    return {
      color: theme.colors.text,
    }
  },
  setsAndRepsAmountText: (theme) => {
    return { color: theme.colors.text }
  },
  button: (theme) => {
    return {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.dark ? "#FFFFFF30" : "#00000015",
    }
  },
  amount: (theme) => {
    return {
      flex: 0.8,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.dark ? "#FFFFFF60" : "#F5F5F5",
    }
  },
  buttonText: (theme) => {
    return {
      color: theme.colors.text,
      fontSize: 20,
    }
  },
})
