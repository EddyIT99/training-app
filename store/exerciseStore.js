import "react-native-get-random-values";
import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { makePersistable, stopPersisting } from "mobx-persist-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { defaultData } from "../assets/defaultData";

function addExcercise(excercises, exerciseName, image) {
  return [
    ...excercises,
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
  excercises = [];
  newExcerciseName = "";
  newImage = null;
  snackBarText = "";

  constructor(data) {
    this.defaultExercises = data;
    makeAutoObservable(this);
  }

  updateNewExcerciseName(text) {
    this.newExcerciseName = text;
  }

  updateSnackBarText(name) {
    this.snackBarText = name;
  }

  updateImage(image) {
    this.newImage = image;
  }

  addExcercise() {
    this.excercises = addExcercise(
      this.excercises,
      this.newExcerciseName,
      this.newImage
    );
    this.snackBarText = this.newExcerciseName;
    this.newExcerciseName = "";
    this.newImage = null;
  }

  selectExcercise(exerciseId, exerciseName, image) {
    const found = this.excercises.find(
      (exercise) => exercise.id === exerciseId
    );
    if (!found) {
      this.excercises.push({
        id: exerciseId,
        exercise: exerciseName,
        image: image,
        sets: 0,
        reps: 0,
      });
    } else {
      this.excercises = deleteExercise(this.excercises, exerciseId);
    }
    console.log(this.excercises);
  }

  deleteExercise(id) {
    this.excercises = deleteExercise(this.excercises, id);
  }

  increaseAmount(id, type) {
    this.excercises = increaseAmount(this.excercises, id, type);
  }

  decreaseAmount(id, type) {
    this.excercises = decreaseAmount(this.excercises, id, type);
  }

  deleteAddedExercises() {
    this.excercises = [];
  }

  stopStore() {
    stopPersisting(this);
  }
}

const exerciseStore = new ExerciseStore(defaultData);
export default exerciseStore;
