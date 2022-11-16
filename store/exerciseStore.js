import "react-native-get-random-values";
import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { defaultData } from "../assets/defaultData";

function addExercise(exercises, exerciseName, image) {
  return [
    ...exercises,
    {
      id: uuidv4(),
      exercise: exerciseName,
      image: image,
      sets: 0,
      reps: 0,
    },
  ];
}

function deleteExercise(exercises, id) {
  return exercises.filter((exercise) => exercise.id !== id);
}

function increaseAmount(exercises, id, type) {
  return exercises.map((exercise) => {
    if (exercise.id !== id) return exercise;
    switch (type) {
      case "sets":
        return { ...exercise, sets: exercise.sets + 1 };
      case "reps":
        return { ...exercise, reps: exercise.reps + 1 };
      default:
        return { ...exercise };
    }
  });
}

function decreaseAmount(exercises, id, type) {
  return exercises.map((exercise) => {
    if (exercise.id !== id) return exercise;
    switch (type) {
      case "sets":
        return { ...exercise, sets: exercise.sets > 0 ? exercise.sets - 1 : 0 };
      case "reps":
        return { ...exercise, reps: exercise.reps > 0 ? exercise.reps - 1 : 0 };
      default:
        return { ...exercise };
    }
  });
}

class ExerciseStore {
  defaultExercises = [];
  exercises = [];
  newExerciseName = "";
  newImage = null;
  snackBarText = "";

  constructor(data) {
    this.defaultExercises = data;
    makeAutoObservable(this);
  }

  updateNewExerciseName(text) {
    this.newExerciseName = text;
  }

  updateSnackBarText(name) {
    this.snackBarText = name;
  }

  updateImage(image) {
    this.newImage = image;
  }

  addExercise() {
    this.exercises = addExercise(
      this.exercises,
      this.newExerciseName,
      this.newImage
    );
    this.snackBarText = this.newExerciseName;
    this.newExerciseName = "";
    this.newImage = null;
  }

  selectExercise(exerciseId, exerciseName, image) {
    const found = this.exercises.find((exercise) => exercise.id === exerciseId);
    if (!found) {
      this.exercises.push({
        id: exerciseId,
        exercise: exerciseName,
        image: image,
        sets: 0,
        reps: 0,
      });
    } else {
      this.exercises = deleteExercise(this.exercises, exerciseId);
    }
    console.log(this.exercises);
  }

  deleteExercise(id) {
    this.exercises = deleteExercise(this.exercises, id);
  }

  increaseAmount(id, type) {
    this.exercises = increaseAmount(this.exercises, id, type);
  }

  decreaseAmount(id, type) {
    this.exercises = decreaseAmount(this.exercises, id, type);
  }

  deleteAddedExercises() {
    this.exercises = [];
  }
}

const exerciseStore = new ExerciseStore(defaultData);
export default exerciseStore;
