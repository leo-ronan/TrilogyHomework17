const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const logger = require("morgan");
const mongoose = require("mongoose");
//CONFIG EXPRESS
const app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")));

//SET PORT
const PORT = process.env.PORT || 8080;

//CONNECT TO MONGOOSE DB
dbConnection();

require("./Routes/api-routes")(app);
require("./Routes/html-routes")(app);

mongoose.connect("mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
})
app.listen(PORT, function() {
    console.log("Server listening on port: " + PORT);
});