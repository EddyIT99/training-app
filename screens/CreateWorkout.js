import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  StatusBar,
} from "react-native";

import { Button, Icon } from "@rneui/base";
import { Snackbar } from "react-native-paper";

import AnimatedLottieView from "lottie-react-native";

import { useHeaderHeight } from "@react-navigation/elements";
import { useTheme } from "@react-navigation/native";

import Header from "../components/workout/Header";
import WorkoutCard from "../components/workout/WorkoutCard";
import CreateWorkoutModal from "../components/workout/CreateWorkoutModal";

import { Observer } from "mobx-react";

import rootStore from "../store/rootStore";

const CreateWorkout = ({ navigation }) => {
  const theme = useTheme();
  const headerHeight = useHeaderHeight();
  const [visible, setVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [displayStyle, setDisplayStyle] = useState(2);

  function screenHeight() {
    let windowHeight = useWindowDimensions().height;
    return windowHeight - headerHeight - StatusBar.currentHeight;
  }

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 10,
        minHeight: Math.round(screenHeight()),
      }}
    >
      <Header
        placeholder="Name workout..."
        displayStyle={displayStyle}
        setDisplayStyle={setDisplayStyle}
      />
      <Observer>
        {() => (
          <>
            {rootStore.excerciseStore.excercises.length === 0 && (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <AnimatedLottieView
                  autoPlay
                  style={{ width: "75%" }}
                  source={require("../assets/lottie-animations/29951-healthy-lifestyle-exercise.json")}
                />
                <Text style={{ fontSize: 20 }}>No excercises added</Text>
              </View>
            )}
          </>
        )}
      </Observer>
      <Observer>
        {() => (
          <>
            {rootStore.excerciseStore.excercises.length > 0 && (
              <FlatList
                style={{ marginTop: 10 }}
                contentContainerStyle={{
                  marginHorizontal: 20,
                  paddingBottom: 120,
                }}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                data={rootStore.excerciseStore.excercises.slice()}
                numColumns={displayStyle}
                key={displayStyle}
                renderItem={({ item, index }) => (
                  <WorkoutCard
                    id={item.id}
                    key={item.id}
                    index={index}
                    numColumns={displayStyle}
                    exercise={item.exercise}
                    sets={item.sets}
                    reps={item.reps}
                  />
                )}
              />
            )}
          </>
        )}
      </Observer>

      <View style={styles.addButtonWrapper}>
        <Text
          style={{ marginBottom: 5, fontSize: 16, color: theme.colors.text }}
        >
          Add exercises
        </Text>
        <Button
          icon={<Icon name="add" />}
          radius={50}
          color={theme.colors.primary}
          buttonStyle={{ width: 60, height: 60 }}
          onPress={() => setVisible(true)}
        />
      </View>

      <View style={styles.doneButtonWrapper}>
        <Observer>
          {() => (
            <Button
              icon={<Icon name="done" />}
              radius={50}
              disabled={
                rootStore.excerciseStore.excercises.length === 0 ||
                rootStore.workoutStore.workoutName.length === 0
                  ? true
                  : false
              }
              color={"success"}
              buttonStyle={{ width: 60, height: 60 }}
              onPress={() => {
                rootStore.workoutStore.addWorkout(
                  rootStore.excerciseStore.excercises
                );
                rootStore.excerciseStore.deleteAddedExercises();
                navigation.navigate("Home");
              }}
            />
          )}
        </Observer>
      </View>

      <CreateWorkoutModal
        visible={visible}
        setVisible={setVisible}
        setSnackbarVisible={setSnackbarVisible}
      />

      <Snackbar
        style={styles.snackbarStyle}
        visible={snackbarVisible}
        duration={2000}
        onDismiss={() => {
          setSnackbarVisible(false);
          rootStore.excerciseStore.updateSnackBarText("");
        }}
      >
        Added exercise '{rootStore.excerciseStore.snackBarText}'
      </Snackbar>
    </View>
  );
};

export default CreateWorkout;

const styles = StyleSheet.create({
  addButtonWrapper: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    alignItems: "center",
  },
  doneButtonWrapper: {
    position: "absolute",
    bottom: 20,
    right: 20,
    alignItems: "center",
  },
  snackbarStyle: {
    borderRadius: 20,
  },
});
