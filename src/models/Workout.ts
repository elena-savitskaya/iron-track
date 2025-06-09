import mongoose from "mongoose";

const SetSchema = new mongoose.Schema({
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
});

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: [SetSchema],
  image: { type: String },
});

const WorkoutSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true },
    category: { type: String, required: true },
    categoryImage: { type: String },
    exercises: [ExerciseSchema],
    note: { type: String },
    date: { type: Date, default: Date.now },
    duration: { type: Number },
  },
  { timestamps: true }
);

if (mongoose.models.Workout) {
  delete mongoose.models.Workout;
}
export default mongoose.model("Workout", WorkoutSchema);
