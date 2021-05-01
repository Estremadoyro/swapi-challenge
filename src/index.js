const express = require("express");
const app = express();
const cors = require("cors");

//Middleware
app.use(cors());
app.use(express.json());

//Routes
const { routes: swapiRoutes } = require("./swapi/routes");
app.use("/api/v1.0/swapi", swapiRoutes);

module.exports = app;
