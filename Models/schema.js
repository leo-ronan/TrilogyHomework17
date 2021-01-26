const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutDB = new Schema (
    {
        day: {
            type: Date,
            default: Date.now
        },
        exercises: [
            {
                type: {
                    type: String, 
                    trim: true,
                    required: "Please enter the workout type"
                },
                name: {
                    type: String,
                    trim: true,
                    required: "Please enter the workout name"
                },
                duration: {
                    type: Number,
                    required: "How long did you do this workout?"
                },
                weight: {
                    type: Number
                },
                reps: {
                    type: Number
                },
                sets: {
                    type: Number
                },
                distance: {
                    type: Number
                }
            }
        ]
    }, {toJSON: {virtuals: true}});

workoutDB.virtual("totalDuration").get(function() {
    return this.exercises.reduce((total, exercise) => {
        var fixedVal = total + exercise.duration;
        return fixedVal;
    }, 0);
});

const Workout = mongoose.model("Workout", workoutDB);
module.exports = Workout;