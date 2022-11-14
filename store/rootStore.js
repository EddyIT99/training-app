import workoutStore from "./workoutStore"
import exerciseStore from "./exerciseStore"

class RootStore {
  workoutStore
  exerciseStore

  constructor() {
    this.workoutStore = workoutStore
    this.exerciseStore = exerciseStore
  }
}

const rootStore = new RootStore()
export default rootStore
