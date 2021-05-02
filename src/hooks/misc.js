const { selectModel } = require("../objects/models");

const modelNamesSpa = selectModel.models.map(({ spa }) => spa);
const modelNamesEng = selectModel.models.map(({ eng }) => eng);

module.exports = { modelNamesSpa, modelNamesEng };
