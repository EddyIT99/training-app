import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import { useTheme } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import rootStore from "../../store/rootStore";
import { Subheading, Paragraph, Title, Headline } from "react-native-paper";

const WorkoutCard = ({
  id,
  exercise,
  sets,
  reps,
  index,
  numColumns,
  onDefaultExerciseScreen,
  selected,
  selectExercise,
}) => {
  const theme = useTheme();

  function rightMargin() {
    switch (numColumns) {
      case 1:
        return 0;
      case 2:
        return index % 2 !== 0 ? 0 : 5;
      default:
        return 0;
    }
  }

  if (onDefaultExerciseScreen) {
    return (
      <TouchableOpacity
        style={[
          styles.defaultCardWrapper(theme, rightMargin),
          {
            borderColor: selected ? theme.colors.primary : "#00000020",
          },
        ]}
        onPress={() => {
          selectExercise(id);
          rootStore.exerciseStore.selectExercise(id, exercise, "");
        }}
      >
        <View style={[styles.innerCardWrapper]}>
          <Subheading style={styles.exerciseTitle(theme)}>
            {exercise}
          </Subheading>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.cardWrapper(theme, rightMargin)}>
      <View style={styles.innerCardWrapper}>
        <Subheading style={styles.exerciseTitle(theme)}>{exercise}</Subheading>
        <View style={styles.setsAndRepsWrapper}>
          <View style={styles.innerInnerCardWrapper}>
            <View style={styles.setsAndRepsText(theme)}>
              <Paragraph>Sets</Paragraph>
            </View>
            <View style={styles.setsAndRepsAmount}>
              <TouchableOpacity
                style={styles.button(theme)}
                onPress={() =>
                  rootStore.exerciseStore.decreaseAmount(id, "sets")
                }
              >
                <Paragraph style={styles.buttonText(theme)}>-</Paragraph>
              </TouchableOpacity>
              <View style={styles.amount(theme)}>
                <Paragraph>{sets}</Paragraph>
              </View>
              <TouchableOpacity
                style={styles.button(theme)}
                onPress={() =>
                  rootStore.exerciseStore.increaseAmount(id, "sets")
                }
              >
                <Paragraph style={styles.buttonText(theme)}>+</Paragraph>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.innerInnerCardWrapper}>
            <View style={styles.setsAndRepsText(theme)}>
              <Paragraph>Reps</Paragraph>
            </View>
            <View style={styles.setsAndRepsAmount}>
              <TouchableOpacity
                style={styles.button(theme)}
                onPress={() =>
                  rootStore.exerciseStore.decreaseAmount(id, "reps")
                }
              >
                <Paragraph style={styles.buttonText(theme)}>-</Paragraph>
              </TouchableOpacity>

              <View style={styles.amount(theme)}>
                <Paragraph>{reps}</Paragraph>
              </View>

              <TouchableOpacity
                style={styles.button(theme)}
                onPress={() => {
                  rootStore.exerciseStore.increaseAmount(id, "reps");
                }}
              >
                <Paragraph style={styles.buttonText(theme)}>+</Paragraph>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <Icon
        name="delete-outline"
        size={30}
        style={{
          marginBottom: 10,
        }}
        onPress={() => rootStore.excerciseStore.deleteExercise(id)}
      />
    </View>
  );
};

export default WorkoutCard;

const styles = StyleSheet.create({
  defaultCardWrapper: (theme, rightMargin) => {
    return {
      backgroundColor: theme.dark ? "#FFFFFF20" : "#00000020",
      height: 150,
      flex: 0.5,
      marginRight: rightMargin(),
      borderWidth: 2,
      borderColor: "#00000020",
      borderRadius: 5,
      justifyContent: "center",
    };
  },
  cardWrapper: (theme, rightMargin) => {
    return {
      backgroundColor: theme.dark ? "#FFFFFF20" : "#00000020",
      flex: 0.5,
      marginRight: rightMargin(),
      borderWidth: 2,
      borderColor: "#00000020",
      borderRadius: 5,
      justifyContent: "center",
    };
  },
  innerCardWrapper: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  exerciseTitle: (theme) => {
    return {
      color: theme.colors.text,
      marginBottom: 10,
      alignItems: "center",
      justifyContent: "center",
    };
  },
  setsAndRepsWrapper: {
    flex: 1,
  },
  innerInnerCardWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
  },
  setsAndRepsText: (theme) => {
    return {
      color: theme.colors.text,
      width: 40,
    };
  },
  setsAndRepsAmount: {
    flex: 1,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  button: (theme) => {
    return {
      backgroundColor: theme.dark ? "#FFFFFF30" : "#00000015",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: 40,
    };
  },
  amount: (theme) => {
    return {
      backgroundColor: theme.dark ? "#FFFFFF60" : "#F5F5F5",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      width: 40,
    };
  },
  buttonText: (theme) => {
    return {
      color: theme.colors.text,
    };
  },
});
