const AWS = require("aws-sdk");
const dynamoClient = new AWS.DynamoDB.DocumentClient({
  region: "us-east-1",
  apiVersion: "2012-08-10",
});

const getAllRecordsByTable = async (table) => {
  const params = { TableName: table };
  const records = await dynamoClient.scan(params).promise();
  return records;
};

const addOrUpdateRecordByTable = async (table, newRecord) => {
  const params = { TableName: table, Item: newRecord };
  return await dynamoClient.put(params).promise();
};

const getRecordByIdAndTable = async (table, id) => {
  const params = { TableName: table, Key: { id } };
  return await dynamoClient.get(params).promise();
};

const deleteRecordByIdAndTable = async (table, id) => {
  const params = { TableName: table, Key: { id } };
  return await dynamoClient.delete(params).promise();
};

module.exports = {
  dynamoClient,
  getAllRecordsByTable,
  addOrUpdateRecordByTable,
  getRecordByIdAndTable,
  deleteRecordByIdAndTable,
};
