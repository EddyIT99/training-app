import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import { useTheme } from "@react-navigation/native";
import { Icon } from "@rneui/base";
import exerciseStore from "../../store/exerciseStore";
import { Subheading, Paragraph } from "react-native-paper";
import { Button } from "@rneui/base";

const WorkoutCard = ({
  id,
  exercise,
  sets,
  reps,
  index,
  numColumns,
  currentScreen,
  selected,
  selectExercise,
  deleteExercise,
  increaseAmount,
  decreaseAmount,
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

  if (currentScreen === "defaultExercises") {
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
          exerciseStore.selectExercise(id, exercise, "");
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <Subheading style={styles.exerciseTitle(theme)}>
            {exercise}
          </Subheading>
          <Icon
            name="delete-outline"
            size={30}
            style={{
              alignSelf: "center",
            }}
            onPress={() => {
              if (currentScreen !== "edit") {
                selectExercise(id);
                exerciseStore.deleteExercise(id);
                console.log(exerciseStore.exercises);
              } else {
                deleteExercise(id);
              }
            }}
          />
        </View>
        <View style={styles.setsAndRepsWrapper}>
          <View style={styles.innerInnerCardWrapper}>
            <View style={styles.setsAndRepsText(theme)}>
              <Paragraph>Sets</Paragraph>
            </View>
            <View style={styles.setsAndRepsAmount}>
              <Button
                color={"#00000035"}
                icon={<Icon name="remove" size={20} />}
                onPress={() => {
                  if (currentScreen !== "edit") {
                    exerciseStore.decreaseAmount(id, "sets");
                  } else {
                    decreaseAmount(id, "sets");
                  }
                }}
              />
              <Button buttonStyle={styles.amount(theme)}>
                <Paragraph>{sets}</Paragraph>
              </Button>
              <Button
                color={"#00000035"}
                icon={<Icon name="add" size={20} />}
                onPress={() => {
                  if (currentScreen !== "edit") {
                    exerciseStore.increaseAmount(id, "sets");
                  } else {
                    increaseAmount(id, "sets");
                  }
                }}
              />
            </View>
          </View>
          <View style={styles.innerInnerCardWrapper}>
            <View style={styles.setsAndRepsText(theme)}>
              <Paragraph>Reps</Paragraph>
            </View>
            <View style={styles.setsAndRepsAmount}>
              <Button
                color={"#00000035"}
                icon={<Icon name="remove" size={20} />}
                onPress={() => {
                  if (currentScreen !== "edit") {
                    exerciseStore.decreaseAmount(id, "reps");
                  } else {
                    decreaseAmount(id, "reps");
                  }
                }}
              />
              <Button buttonStyle={styles.amount(theme)}>
                <Paragraph>{reps}</Paragraph>
              </Button>
              <Button
                color={"#00000035"}
                icon={<Icon name="add" size={20} />}
                onPress={() => {
                  if (currentScreen !== "edit") {
                    exerciseStore.increaseAmount(id, "reps");
                  } else {
                    increaseAmount(id, "reps");
                  }
                }}
              />
            </View>
          </View>
        </View>
      </View>
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
      fontWeight: "900",
    };
  },
  setsAndRepsWrapper: {
    flex: 1,
    justifyContent: "center",
  },
  innerInnerCardWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  setsAndRepsText: (theme) => {
    return {
      color: theme.colors.text,
    };
  },
  setsAndRepsAmount: {
    flex: 1,
    // height: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  button: (theme) => {
    return {
      backgroundColor: theme.dark ? "#FFFFFF30" : "#00000015",
      alignItems: "center",
      justifyContent: "center",
      // height: "100%",
      width: 40,
    };
  },
  amount: (theme) => {
    return {
      backgroundColor: theme.dark ? "#FFFFFF60" : "#F5F5F5",
      alignItems: "center",
      justifyContent: "center",
    };
  },
  buttonText: (theme) => {
    return {
      color: theme.colors.text,
    };
  },
});
