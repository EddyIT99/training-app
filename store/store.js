/*** src/Store.js ***/
import "react-native-get-random-values";
import { makeAutoObservable } from "mobx";
import { v4 as uuidv4 } from "uuid";

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

const deleteExercise = (exercises, name) =>
  exercises.filter((exercise) => exercise.name !== name);

class Store {
  workouts = [];
  excercises = [];
  newExcerciseName = "";
  newImage = null;
  snackBarText = "";

  constructor() {
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

  deleteExercise() {
    this.excercises = deleteExercise(this.excercises, this.snackBarText);
  }
}

const store = new Store();
export default store;
