import { DarkTheme, DefaultTheme } from "@react-navigation/native";

export const GlobalComponentStyle = {
  borderRadius: 15,
  padding: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  },
  margin: {
    top: 10,
    right: 10,
    bottom: 10,
    left: 10,
  },
};

export const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "#d35400",
    // secondary: "#f39c12",
    // background: "#222222",
    // text: "#F5F5F5",
    // headerColor: "#222222",
  },
};

export const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#d35400",
    // secondary: "#f39c12",
    // headerColor: "#ffffff",
  },
};
