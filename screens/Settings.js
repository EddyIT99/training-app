import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Divider } from "@rneui/base";

import ThemeListItem from "../components/settings/ThemeListItem";

import { useTheme } from "@react-navigation/native";
import { useDarkMode } from "../context/themeContext";

const Settings = () => {
  const theme = useTheme();
  const darkMode = useDarkMode().darkMode;
  const setDarkMode = useDarkMode().setDarkMode;

  return (
    <ScrollView>
      <Divider
        style={styles.headerDivider}
        subHeader="Theme settings"
        subHeaderStyle={styles.dividerSubHeader(theme)}
      />
      <ThemeListItem
        text="Light mode"
        checked={!darkMode}
        onPress={() => setDarkMode(false)}
      />
      <Divider width={1} style={{ marginHorizontal: 20 }} />
      <ThemeListItem
        text="Dark mode"
        checked={darkMode}
        onPress={() => setDarkMode(true)}
      />
      <Divider width={1} style={{ marginHorizontal: 20 }} />
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  headerDivider: {
    marginTop: 10,
    marginHorizontal: 20,
    width: 0,
  },
  dividerSubHeader: (theme) => {
    return {
      color: theme.colors.text,
      marginHorizontal: 15,
      fontSize: 16,
    };
  },
});
