import { StyleSheet, Text, View, Pressable, Touchale } from "react-native";
import React, { useEffect, useState } from "react";

const Home = ({ navigation }) => {
  return (
    <View>
      <Pressable onPress={() => navigation.navigate("CreateWorkout")}>
        <View style={styles.test}>
          <Text>Create Workout</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  test: {},
});
