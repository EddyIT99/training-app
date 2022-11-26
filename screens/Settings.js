import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  TouchableNativeFeedback,
  View,
  Text,
} from "react-native";

import { Divider, Icon } from "@rneui/base";

import ThemeListItem from "../components/settings/ThemeListItem";
import Alert from "../components/Alert";

import { useTheme } from "@react-navigation/native";
import { useDarkMode } from "../context/themeContext";

const Settings = () => {
  const theme = useTheme();
  const darkMode = useDarkMode().darkMode;
  const setDarkMode = useDarkMode().setDarkMode;

  const [showAlert, setShowAlert] = useState(false);

  return (
    <>
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
        <Divider
          style={styles.headerDivider}
          subHeader="Storage settings"
          subHeaderStyle={styles.dividerSubHeader(theme)}
        />

        {/* 
      "",
      "",
      */}

        <TouchableNativeFeedback onPress={() => setShowAlert(true)}>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 25,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                paddingVertical: 16,
                color: theme.colors.text,
              }}
            >
              Clear local storage
            </Text>

            <Icon
              containerStyle={{ right: 10 }}
              name="delete-outline"
              type="material"
              color={theme.colors.text}
              size={25}
            />
          </View>
        </TouchableNativeFeedback>
      </ScrollView>
      {showAlert && <Alert showAlert={showAlert} setShowAlert={setShowAlert} />}
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
  headerDivider: {
    marginTop: 5,
    marginHorizontal: 20,
    width: 0,
  },
  dividerSubHeader: (theme) => {
    return {
      color: theme.colors.text,
      marginBottom: 5,
      marginHorizontal: 15,
      fontSize: 16,
    };
  },
});
