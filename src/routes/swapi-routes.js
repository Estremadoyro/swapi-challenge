const express = require("express");
const axios = require("axios");

const { modelNamesSpa, modelNamesEng } = require("../hooks/misc");
const { isValidModel, isValidId } = require("../middleware/validations");
const modelRouter = express.Router();
const modelIdRouter = express.Router({ mergeParams: true });

modelRouter.use("/:model", modelIdRouter);

modelRouter.route("/").get((req, res) => {
  res.status(200).json({ msg: "owo swapi route" });
});

modelRouter.route("/:model").get(isValidModel, async (req, res) => {
  let { model } = req.params;
  model = model.toLowerCase();
  const modelSpaIndex = modelNamesSpa.indexOf(model);
  const modelEng = modelNamesEng[modelSpaIndex];
  try {
    const { data } = await axios.get(`https://swapi.py4e.com/api/${modelEng}`);
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
    console.log(err);
  }
});

modelIdRouter.route("/:id").get([isValidModel, isValidId], async (req, res) => {
  const { id, model } = req.params;
  const modelSpaIndex = modelNamesSpa.indexOf(model);
  const modelEng = modelNamesEng[modelSpaIndex];
  try {
    const { data } = await axios.get(
      `https://swapi.py4e.com/api/${modelEng}/${id}`
    );
    res.status(200).json({ data });
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

module.exports = { modelRouter };
