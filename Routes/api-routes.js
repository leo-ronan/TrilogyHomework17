const path = require('path');
const db = require("../Models");

module.exports = function(app) {
    app.get("/api/workouts", (res) => {
        db.Workout.find({}).sort({ day: -1 }).limit(1)
        .then(workoutDb => {
            res.json(workoutDb);
        })
        .catch(error => {
            res.json(error);
        });
    });

    app.get("/api/workouts/range", (res) => {
        db.Workout.find({})
        .then(workoutDb => {
            res.json(workoutDb);
        })
        .catch(error => {
            res.json(error);
        });
    });

    app.put("/api/workouts/:id", (res) => {
        const data = req.body;
            db.Workout.updateOne( { _id: req.params.id }, { $push: { exercises: [
                {
                    "type": data.type,
                    "name": data.name,
                    "duration": data.duration,
                    "distance": data.distance,
                    "weight": data.weight,
                    "reps": data.reps,
                    "sets": data.sets
                }
            ] 
            }})
            .then(updateDB => {
                res.json(updateDB);
            })
            .catch(error => {
                res.json(error);
            });
        });
    
    app.post("/api/workouts", (res) => {
        db.Workout.create({
            day: new Date().setDate(new Date().getDate())
        })
        .then(updateDB => {
            res.json(updateDB);
        })
        .catch(err => {
            res.json(err);
        });
    });
    
}
