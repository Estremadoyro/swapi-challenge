const { modelNamesSpa } = require("../hooks/misc");
const { DOC_ROUTES } = require("../objects/routes");

const isValidModel = (req, res, next) => {
  const { model } = req.params;
  const modelName = model.toLowerCase();
  if (!modelNamesSpa.includes(modelName)) {
    res
      .status(400)
      .json({ error: "Modelo invalido", documentacion: DOC_ROUTES });
  } else {
    next();
  }
};

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (id < 1) {
    res
      .status(400)
      .json({ error: "Id debe ser mayor a 1", documentacion: DOC_ROUTES });
  } else {
    next();
  }
};

module.exports = { isValidModel, isValidId };
