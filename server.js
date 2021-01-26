const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv/config');
const dbConnection = require("./config/dbConnection.js");
const db = require("./Models");

//EXPRESS

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")));

const PORT = process.env.PORT || 8080;

//HTML ROUTES

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "exercise.html"));
});
app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "stats.html"));
});

//API ROUTES

app.get("/api/workouts", (req, res) => {
    db.Workout.find({}).sort({ day: -1 }).limit(1)
    .then(workoutDb => {
        res.json(workoutDb);
    }).catch(error => {
        res.json(error);
    });
});

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
    .then(workoutDb => {
        res.json(workoutDb);
    })
    .catch(error => {
        res.json(error);
    });
  });

//REQUESTS

app.put("/api/workouts/:id", (req,res) => {
    const urlData = req.params;
    const data = req.body;
        db.Workout.updateOne( { _id: urlData.id }, { $push: { exercises: [
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

app.post("/api/workouts", (req,res) => {
    const data = req.body;
    
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

dbConnection();
app.listen(PORT, function() {
    console.log("Server listening on port: " + PORT);
});