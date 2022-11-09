/*** src/Store.js ***/
import "react-native-get-random-values";
import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";

function addWorkout(workouts, workoutName, excercises) {
  return [
    ...workouts,
    {
      id: uuidv4(),
      name: workoutName,
      exercises: excercises,
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
  }

  addWorkout(excercises) {
    this.workouts = addWorkout(this.workouts, this.workoutName, excercises);
    this.workoutName = "";
    console.log(this.workouts);
  }

  deleteWorkout(workoutId) {
    this.workouts = deleteWorkout(this.workouts, workoutId);
  }

  updateWorkoutName(text) {
    this.workoutName = text;
  }
}

const workoutStore = new WorkoutStore();
export default workoutStore;
