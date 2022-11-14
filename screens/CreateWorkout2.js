import { StyleSheet, Text, View } from "react-native"
import React from "react"

import ProgressBar from "../components/workout/ProgressBar"
import DefaultExercises from "./DefaultExercises"

import { useMultistepPage } from "../hooks/useMultistepPage"

const CreateWorkout2 = () => {
  const { step, goTo, next, back, currentStepIndex } = useMultistepPage([
    <DefaultExercises />,
    <View>
      <Text>TESTING</Text>
    </View>,
    <View>
      <Text>TESTING TEST SETSETSET</Text>
    </View>,
  ])

  return (
    <View style={{ flex: 1 }}>
      <ProgressBar currentStepIndex={currentStepIndex} goTo={goTo} />
      {step}
    </View>
  )
}

export default CreateWorkout2

const styles = StyleSheet.create({})
