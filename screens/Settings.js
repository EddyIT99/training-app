import React, { useState } from "react";
import { StyleSheet, Text, ScrollView, View, Pressable } from "react-native";

import { CheckBox, Icon } from "@rneui/base";

import { useDarkMode } from "../context/themeContext";

const Settings = () => {
  const darkMode = useDarkMode().darkMode;
  const setDarkMode = useDarkMode().setDarkMode;

  return (
    <ScrollView>
      <Pressable onPress={() => setDarkMode(false)}>
        <View
          style={{
            flexDirection: "row",
            borderBottomWidth: 1,
            borderBottomColor: "#00000015",
            paddingHorizontal: 20,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 20, paddingVertical: 16 }}>Light mode</Text>
          <CheckBox
            containerStyle={{
              backgroundColor: "transparent",
              padding: 0,
            }}
            checkedIcon={
              <Icon
                name="radio-button-checked"
                type="material"
                color="green"
                size={25}
              />
            }
            uncheckedIcon={
              <Icon
                name="radio-button-unchecked"
                type="material"
                color="grey"
                size={25}
              />
            }
            checked={!darkMode}
            onPress={() => {
              setDarkMode(false);
            }}
          />
        </View>
      </Pressable>
      <Pressable onPress={() => setDarkMode(true)}>
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 20,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 20, paddingVertical: 16 }}>Dark mode</Text>
          <CheckBox
            containerStyle={{
              backgroundColor: "transparent",
              padding: 0,
            }}
            checkedIcon={
              <Icon
                name="radio-button-checked"
                type="material"
                color="green"
                size={25}
              />
            }
            uncheckedIcon={
              <Icon
                name="radio-button-unchecked"
                type="material"
                color="grey"
                size={25}
              />
            }
            checked={darkMode}
            onPress={() => {
              setDarkMode(true);
            }}
          />
        </View>
      </Pressable>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({});
