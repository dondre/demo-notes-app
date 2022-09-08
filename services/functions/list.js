import handler from "../util/handler";
import dynamoDb from "../util/dynamodb";

export const main = handler(async (event) => {

  const params = {
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": "123",
    },
  };

  const result = await dynamoDb.query(params);
  if (!result.Items) {
    throw new Error("Item not found.");
  }

  return result.Items;
});