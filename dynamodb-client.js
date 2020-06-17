const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-west-2' });

exports.dynamoDbClient = async () => {
  try {
    // Create DynamoDB document client
    return new AWS.DynamoDB.DocumentClient();
  } catch (err) {
    console.log(err);
    throw err;
  }
};
