const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const dbConnection = require("./config/dbConnection.js");
require('dotenv/config');

//CONFIG EXPRESS
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")));

//SET PORT
const PORT = process.env.PORT || 8080;

//CONNECT TO MONGOOSE DB
dbConnection();

require("./Routes/api-routes")(app);
require("./Routes/html-routes")(app);

app.listen(PORT, function() {
    console.log("Server listening on port: " + PORT);
});