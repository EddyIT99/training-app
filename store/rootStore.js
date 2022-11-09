import workoutStore from "./workoutStore";
import exerciseStore from "./exerciseStore";

class RootStore {
  workoutStore;
  excerciseStore;

  constructor() {
    this.workoutStore = workoutStore;
    this.excerciseStore = exerciseStore;
  }
}

const rootStore = new RootStore();
export default rootStore;
