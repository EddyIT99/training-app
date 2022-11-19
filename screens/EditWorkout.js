import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { Observer } from "mobx-react";
import workoutStore from "../store/workoutStore";
import { Headline, Caption, Divider } from "react-native-paper";
import { Icon } from "@rneui/base";

const EditWorkout = () => {
  return (
    <Observer>
      {() => (
        <FlatList
          contentContainerStyle={{
            padding: 10,
          }}
          data={workoutStore.workouts.slice()}
          scrollEnabled
          renderItem={({ item }) => (
            <>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 5,
                }}
                onPress={() => console.log(item.name, item.id)}
              >
                <View>
                  <Headline>{item.name}</Headline>
                  <Caption>
                    Number of exercises: {item.exercises.length}
                  </Caption>
                </View>
                <Icon name="edit" type="antdesign" size={30} />
              </TouchableOpacity>
              <Divider />
            </>
          )}
        />
      )}
    </Observer>
  );
};

export default EditWorkout;

const styles = StyleSheet.create({});
