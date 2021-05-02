const express = require("express");
const {
  getAllRecordsByTable,
  addOrUpdateRecordByTable,
  getRecordByIdAndTable,
} = require("../db");
const { modelNamesSpa, modelNamesEng } = require("../hooks/misc");
const { isValidModel, isValidId } = require("../middleware/validations");
const modelRouterDB = express.Router();
const modelIdRouterDB = express.Router({ mergeParams: true });

modelRouterDB.use("/:model", modelIdRouterDB);

modelRouterDB.get("/", (req, res) => {
  res.status(200).json({ msg: "owo db routes" });
});

modelRouterDB.route("/:model").get(isValidModel, async (req, res) => {
  let { model } = req.params;
  model = model.toLowerCase();
  try {
    const records = await getAllRecordsByTable(model);
    res.status(200).json({ records });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
    console.log(err);
  }
});

//@POST
modelRouterDB.route("/:model").post(isValidModel, async (req, res) => {
  let { model } = req.params;
  const record = req.body;
  model = model.toLowerCase();
  try {
    const newRecord = await addOrUpdateRecordByTable(model, record);
    res.status(200).json({ record });
  } catch (error) {
    if (error.response) {
      if (error.response.status != 500) {
        res.status(error.response.status).json({
          error: `En ${model} ya existe un registro con Id: ${record.id}`,
          status: error.response.status,
        });
        return;
      }
    }
    res.status(500).json({ error: `Server error` });
  }
});

modelIdRouterDB
  .route("/:id")
  .get([isValidModel, isValidId], async (req, res) => {
    const { id, model } = req.params;
    try {
      const record = await getRecordByIdAndTable(model, id);
      res.status(200).json({ record });
    } catch (error) {
      console.log(error);
      if (error.response.status == 404) {
        res.status(404).json({
          error: `No se encontraron ${model} con Id: ${id}`,
          status: error.response.status,
        });
        return;
      }
      res.status(500).json({ error: error });
    }
  });
module.exports = { modelRouterDB };
