/*** src/Store.js ***/
import "react-native-get-random-values";
import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { makePersistable, stopPersisting } from "mobx-persist-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

function addWorkout(workouts, workoutName, exercises) {
  return [
    ...workouts,
    {
      id: uuidv4(),
      name: workoutName,
      exercises: exercises,
    },
  ];
}

function deleteWorkout(workouts, workoutId) {
  return workouts.filter((workout) => workout.id !== workoutId);
}

class WorkoutStore {
  workouts = [];
  workoutHistory = [];
  workoutName = "";

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: "WorkoutStore",
      properties: ["workouts", "workoutHistory"],
      storage: AsyncStorage,
    });
  }

  addWorkout(exercises) {
    this.workouts = addWorkout(this.workouts, this.workoutName, exercises);
    this.workoutName = "";
    console.log(this.workouts);
  }

  deleteWorkout(workoutId) {
    this.workouts = deleteWorkout(this.workouts, workoutId);
  }

  updateWorkoutName(text) {
    this.workoutName = text;
  }

  stopStore() {
    stopPersisting(this);
  }
}

const workoutStore = new WorkoutStore();
export default workoutStore;
