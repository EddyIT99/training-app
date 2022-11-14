import React from "react"
import { StyleSheet, View } from "react-native"

import { useTheme } from "@react-navigation/native"

import HomeScreenButton from "../components/home/HomeScreenButton"

const Home = () => {
  const theme = useTheme()
  const buttonArray = [
    {
      screen: "CreateWorkout2",
      text: "Create Workout",
    },
    {
      screen: "StartWorkout",
      text: "Start Workout",
    },
    {
      screen: "EditWorkout",
      text: "Edit Workout",
    },
  ]

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 30,
        justifyContent: "space-evenly",
      }}
    >
      {buttonArray.map((button, index) => (
        <HomeScreenButton
          key={index}
          screen={button.screen}
          text={button.text}
          theme={theme}
        />
      ))}
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
})
