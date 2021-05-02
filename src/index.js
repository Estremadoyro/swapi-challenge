const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const { DOC_ROUTES } = require("./objects/routes");
//Middleware
app.use(cors());
app.use(express.json());

//Routes
const { modelRouter } = require("./routes/swapi-routes");
const { modelRouterDB } = require("./routes/db-routes");
app.use("/api/v1.0/swapi", modelRouter);
app.use("/api/v1.0/db", modelRouterDB);

//Documentation
app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

//Default route
// app.get("*", (req, res) => {
//   res.redirect(DOC_ROUTES);
// });
module.exports = app;
