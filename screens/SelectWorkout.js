import { StyleSheet, Text, View } from "react-native"
import { useState, useLayoutEffect, useEffect } from "react"
import { useTheme } from "@react-navigation/native"
import workoutStore from "../store/workoutStore"
import DefaultExercises from "../components/workout/DefaultExercises"

const SelectWorkout = ({ navigation, route }) => {
  const { workoutName, workoutId } = route.params

  const theme = useTheme()
  const [exercises, setExercises] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: workoutName,
    })
  }, [])

  const selectExercise = () => {
    navigation.navigate("")
  }

  useEffect(() => {
    const workout = workoutStore.getWorkoutById(workoutId)
    setExercises(workout.exercises.slice())
  }, [])

  return (
    <View>
      <DefaultExercises exercises={exercises} />
    </View>
  )
}

export default SelectWorkout

const styles = StyleSheet.create({})
